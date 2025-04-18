import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/actions/profile.action";
import { getDbUserId } from "@/actions/user.actions";
import ProfilePageClient from "@/components/ProfilePageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {

    const username = (await params).username
    // const authUser = currentUser()
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
    const authUserDbId = await  getDbUserId()

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            authUserId={authUserDbId}
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}
export default ProfilePageServer;