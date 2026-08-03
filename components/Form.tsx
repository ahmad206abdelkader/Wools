import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './avatar';
import Button from './Button';
import WelcomeCard from './WelcomeCard';
import { FiGlobe } from 'react-icons/fi';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body });

      toast.success('Wool created');
      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div id="composer" className="scroll-mt-24 border-b border-[#242a31]">
      {currentUser ? (
        <div className="flex gap-3 px-4 py-5 sm:px-5">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="min-w-0 flex-1">
            <textarea
              aria-label={placeholder}
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              rows={3}
              maxLength={280}
              className="min-h-[88px] w-full resize-none bg-transparent pt-1 text-lg leading-7 text-white placeholder:text-[#687582] focus:ring-0 disabled:opacity-60 sm:text-xl"
              placeholder={placeholder}>
            </textarea>
            <div className="mt-3 flex items-center justify-between border-t border-[#242a31] pt-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-sky-400">
                <FiGlobe size={14} aria-hidden="true" />
                Everyone can reply
              </span>
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Wool" />
            </div>
          </div>
        </div>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};

export default Form;
