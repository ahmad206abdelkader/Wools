
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import Image from "next/image";
import { FiBell } from "react-icons/fi";
import PostSkeleton from "@/components/posts/PostSkeleton";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (isLoading) {
    return <PostSkeleton count={3} />;
  }

  if (fetchedNotifications.length === 0) {
    return (
      <div className="flex flex-col items-center px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-400/[0.08] text-sky-400">
          <FiBell size={26} aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-white">You&apos;re all caught up</h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-[#71808e]">
          Likes, follows, and other activity will appear here.
        </p>
      </div>
    )
  }
  
  return ( 
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div key={notification.id} className="flex items-center gap-4 border-b border-[#242a31] p-5 transition hover:bg-white/[0.025]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">
            <Image
              src="/wools.png"
              width={264}
              height={285}
              alt=""
              className="h-[30px] w-auto"
            />
          </div>
          <p className="text-sm leading-6 text-slate-100">
            {notification.body}
          </p>
        </div>
        ))}
    </div>
   );
}
 
export default NotificationsFeed;
