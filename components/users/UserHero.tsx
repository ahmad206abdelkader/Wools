import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../avatar";

interface UserHeroProps{
    userId:string;

}

const UserHero: React.FC<UserHeroProps> = ({
    userId
}) => {
    const {data: fetcherUser} = useUser(userId);
  return (
    <div className="relative">
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-sky-900/60 via-[#1c3345] to-[#151b22] sm:h-48">
            {fetcherUser?.coverImage && (
                <Image src={fetcherUser.coverImage} fill alt="Cover Image" style={{objectFit: 'cover'}} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
        <div className="absolute -bottom-14 left-4 sm:-bottom-16 sm:left-5">
            <Avatar userId={userId} isLarge hasBorder />
        </div>
    </div>
  )
}

export default UserHero;
