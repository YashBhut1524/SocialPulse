"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

//Create user with clerk webhook
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

export const getUserByClerkId = async (clerkId: string) => {
    return prisma.user.findUnique({
        where:{ 
            clerkId,
        },
        include: {
            _count: {
                select: {
                    following: true,
                    followers: true,
                    posts: true,
                }
            }
        }
    })
}

export const getDbUserId = async () => {
    const {userId: clerkId} = await auth()
    if(!clerkId) throw new Error("Unauthorized User")

    const  user = await getUserByClerkId(clerkId)

    if(!user) throw new Error("User not found")

    return user.id
}

// export const deleteUser = async (clerkId: string) => {
//     try {
//         await prisma.user.delete({
//             where: { clerkId },
//         });
//     } catch (error) {
//         console.error("Error in deleteUser:", error);
//         throw new Error("Failed to delete user");
//     }
// };