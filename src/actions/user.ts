"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

// export const syncUser = async () => {
//     try {
//         const {userId} = await auth()
//         const user = await currentUser()

//         if(!user || !userId) return; //user is not logged in

//         //check if user exist
//         const existingUser = await prisma.user.findUnique({
//             where:{
//                 clerkId: userId
//             }
//         })

//         if(existingUser) {
//             return existingUser
//         }

//         //if user does not exist create new user in db
//         const dbUser = await prisma.user.create({
//             data:{
//                 clerkId: userId,
//                 name: `${user.firstName || ""} ${user.lastName || ""}`,
//                 username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
//                 email: user.emailAddresses[0].emailAddress,
//                 image: user.imageUrl,
//             }
//         })

//         return dbUser;

//     } catch (error) {
//         console.log(error)
//     }
// }


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