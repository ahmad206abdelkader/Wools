import PageHeader from "@/components/layout/PageHeader";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

import useUser from "@/hooks/useUser";

import { useRouter } from "next/router";
import PostFeed from "@/components/posts/PostFeed";
import PostSkeleton from "@/components/posts/PostSkeleton";


const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;
    
    const {data: fetchedUser, isLoading} = useUser(userId as string);

    if(isLoading || !fetchedUser){
        return(
            <div className="min-h-screen">
                <PageHeader label="Profile" showBackArrow />
                <div className="h-44 animate-pulse border-b border-[#242a31] bg-white/[0.05]" />
                <div className="px-5 py-8">
                  <div className="h-5 w-40 animate-pulse rounded bg-white/[0.07]" />
                  <div className="mt-3 h-3 w-24 animate-pulse rounded bg-white/[0.05]" />
                </div>
                <PostSkeleton count={2} />
            </div>
        )
    }

  return (
    <>
        <PageHeader showBackArrow label={fetchedUser?.name} description={`@${fetchedUser?.username}`} />
        <UserHero userId={userId as string} />
        <UserBio userId={userId as string} />
        <PostFeed userId={userId as string} />
    </>
  )
};

export default UserView;
