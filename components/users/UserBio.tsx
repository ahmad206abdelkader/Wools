import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])


  return ( 
    <section className="border-b border-[#242a31] pb-5">
      <div className="flex min-h-[72px] justify-end p-3 sm:p-4">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow} 
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-2 px-4 sm:px-5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-white">
            {fetchedUser?.name}
          </h2>
          <p className="text-sm text-[#71808e]">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="mt-5 flex flex-col">
          <p className="whitespace-pre-wrap text-[15px] leading-6 text-slate-100">
            {fetchedUser?.bio}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-[#71808e]
          ">
            <BiCalendar size={19} aria-hidden="true" />
            <p className="text-sm">
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-[#71808e]">Following</p>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-[#71808e]">Followers</p>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default UserBio;
