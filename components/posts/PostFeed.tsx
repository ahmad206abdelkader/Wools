import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';
import EmptyFeedState from './EmptyFeedState';
import PostSkeleton from './PostSkeleton';

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <EmptyFeedState
        title={userId ? "No wools here yet" : undefined}
        description={userId ? "When this person shares something, it will show up here." : undefined}
      />
    );
  }

  return (
    <div aria-label="Wools feed">
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
