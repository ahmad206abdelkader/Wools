import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../avatar';
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId});

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToPost();
    }
  }, [goToPost]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  return (
    <article
      onClick={goToPost}
      onKeyDown={onKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Wool by ${data.user.name}`}
      className="group cursor-pointer border-b border-[#242a31] p-4 transition duration-200 hover:bg-white/[0.025] focus-visible:bg-white/[0.025] sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5 text-sm">
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
            <span className="shrink-0 text-[#52606d]" aria-hidden="true">·</span>
            <span className="shrink-0 text-xs text-[#71808e]">
              {createdAt ? `${createdAt} ago` : ''}
            </span>
          </div>
          <div className="mt-1.5 whitespace-pre-wrap break-words text-[15px] leading-6 text-slate-100">
            {data.body}
          </div>
          <div className="mt-4 flex items-center gap-8 sm:gap-12">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToPost();
              }}
              className="group/action flex items-center gap-2 text-xs text-[#71808e] transition hover:text-sky-400"
              aria-label={`${data.comments?.length || 0} comments`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full transition group-hover/action:bg-sky-400/10">
                <FiMessageCircle size={17} aria-hidden="true" />
              </span>
              <span>
                {data.comments?.length || 0}
              </span>
            </button>
            <button
              type="button"
              onClick={onLike}
              className={`group/action flex items-center gap-2 text-xs transition ${hasLiked ? 'text-rose-400' : 'text-[#71808e] hover:text-rose-400'}`}
              aria-label={`${hasLiked ? 'Unlike' : 'Like'} this wool. ${data.likedIds.length} likes`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full transition group-hover/action:bg-rose-400/10">
                <LikeIcon size={18} aria-hidden="true" />
              </span>
              <span>
                {data.likedIds.length}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostItem;
