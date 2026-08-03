import CommentItem from "./CommentItem";
import EmptyFeedState from "./EmptyFeedState";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  if (comments.length === 0) {
    return (
      <EmptyFeedState
        title="No replies yet"
        description="Start the conversation by sharing the first reply."
      />
    );
  }

  return (
    <div aria-label="Replies">
      {comments.map((comment: Record<string, any>,) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
