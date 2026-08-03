import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";

import PageHeader from "@/components/layout/PageHeader";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import PostSkeleton from "@/components/posts/PostSkeleton";


const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="min-h-screen">
        <PageHeader showBackArrow label="Wool" />
        <PostSkeleton count={1} />
      </div>
    )
  }

  return ( 
    <>
      <PageHeader showBackArrow label="Wool" description="Conversation" />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
   );
}
 
export default PostView;
