import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/actions/profile.action";
import ProfilePageClient from "@/components/ProfilePageClient";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {

    const username = (await params).username
    const user = await getProfileByUsername(username);
    if (!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    };
}

async function ProfilePageServer({ params }: { params: Promise<{ username: string }> }) {

    const username = (await params).username
    const user = await getProfileByUsername(username);
    const authUser = await currentUser()

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            authUser={authUser}
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}
export default ProfilePageServer;