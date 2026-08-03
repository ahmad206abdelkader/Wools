import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();

    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <article className="border-b border-[#242a31] p-4 transition hover:bg-white/[0.025] sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <button
              type="button"
              onClick={goToUser} 
              className="truncate font-semibold text-white hover:underline">
              {data.user.name}
            </button>
            <button
              type="button"
              onClick={goToUser} 
              className="hidden truncate text-[#71808e] hover:underline sm:block">
              @{data.user.username}
            </button>
            <span className="text-[#52606d]" aria-hidden="true">·</span>
            <span className="shrink-0 text-xs text-[#71808e]">
              {createdAt ? `${createdAt} ago` : ''}
            </span>
          </div>
          <div className="mt-1.5 whitespace-pre-wrap break-words text-[15px] leading-6 text-slate-100">
            {data.body}
          </div>
        </div>
      </div>
    </article>
  )
}

export default CommentItem;
