import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps{
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
}) => {
    const router = useRouter();
    const { data:fetchedUser } = useUser(userId);

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url);
    },[router, userId]);

    return(
        <button
          type="button"
          onClick={onClick}
          aria-label={`View ${fetchedUser?.name || 'user'} profile`}
          className={`
          ${hasBorder ? 'border-4 border-[#0b0e12]' : 'ring-1 ring-white/10'}
          ${isLarge ? 'h-28 sm:h-32' : 'h-11'}
          ${isLarge ? 'w-28 sm:w-32' : 'w-11'}
          relative shrink-0 overflow-hidden rounded-full bg-[#20262d]
          transition hover:opacity-90
      `}>
        <Image
         fill
         style={{
            objectFit:'cover',
            borderRadius:'100%'
         }}
         alt='Avatar'
         src={fetchedUser?.profileImage || '/images/placeholder.png'}
        />
    </button>
    )
}

export default Avatar;
