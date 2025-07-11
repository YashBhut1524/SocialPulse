"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const syncUser = async ({
    clerkId,
    firstName,
    lastName,
    email,
    image,
    username,
}: {
    clerkId: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    image?: string | null;
    username?: string | null;
}) => {
    try {
        if (!clerkId) return; // Ensure userId is provided

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (existingUser) {
            return existingUser;
        }

        // If user does not exist, create new user in DB
        return await prisma.user.create({
            data: {
                clerkId,
                name: `${firstName || ""} ${lastName || ""}`.trim(),
                username: username ?? email.split("@")[0],
                email,
                image,
            },
        });
    } catch (error) {
        console.error("Error in syncUser:", error);
        throw new Error("Database operation failed");
    }
};

export async function getUserByClerkId(clerkId: string) {
    return prisma.user.findUnique({
        where: {
            clerkId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                },
            },
        },
    });
}

export async function getDbUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const user = await getUserByClerkId(clerkId);

    if (!user) throw new Error("User not found");

    return user.id;
}

export async function getRandomUsers() {
    try {
        const userId = await getDbUserId();

        if (!userId) return [];

        // get 3 random users exclude ourselves & users that we already follow
        const randomUsers = await prisma.user.findMany({
            where: {
                AND: [
                    { NOT: { id: userId } },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                _count: {
                    select: {
                        followers: true,
                    },
                },
            },
            take: 3,
        });

        return randomUsers;
    } catch (error) {
        console.log("Error fetching random users", error);
        return [];
    }
}

export async function toggleFollow(targetUserId: string) {
    try {
        const userId = await getDbUserId();

        if (!userId) return;

        if (userId === targetUserId) throw new Error("You cannot follow yourself");

        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            // unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: targetUserId,
                    },
                },
            });
        } else {
            // follow
            await prisma.$transaction([
                prisma.follows.create({
                    data: {
                        followerId: userId,
                        followingId: targetUserId,
                    },
                }),

                prisma.notification.create({
                    data: {
                        type: "FOLLOW",
                        userId: targetUserId, // user being followed
                        creatorId: userId, // user following
                    },
                }),
            ]);
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.log("Error in toggleFollow", error);
        return { success: false, error: "Error toggling follow" };
    }
}