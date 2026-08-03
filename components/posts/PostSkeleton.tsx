interface PostSkeletonProps {
  count?: number;
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ count = 3 }) => {
  return (
    <div aria-label="Loading posts" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse border-b border-[#242a31] p-4 sm:p-5">
          <div className="flex gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white/[0.07]" />
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="h-3.5 w-24 rounded bg-white/[0.08]" />
                <div className="h-3.5 w-16 rounded bg-white/[0.05]" />
              </div>
              <div className="mt-4 h-3 w-full rounded bg-white/[0.06]" />
              <div className="mt-2 h-3 w-4/5 rounded bg-white/[0.05]" />
              <div className="mt-5 flex gap-12">
                <div className="h-7 w-14 rounded-full bg-white/[0.04]" />
                <div className="h-7 w-14 rounded-full bg-white/[0.04]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
