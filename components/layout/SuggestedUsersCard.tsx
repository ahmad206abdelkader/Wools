import Image from "next/image";
import Link from "next/link";

import useUsers from "@/hooks/useUsers";

const SuggestedUsersCard = () => {
  const { data: users = [], isLoading } = useUsers();
  const suggestedUsers = users.slice(0, 3);

  return (
    <section className="surface-card overflow-hidden" aria-labelledby="suggested-title">
      <h2 id="suggested-title" className="px-5 pb-2 pt-5 font-semibold text-white">
        People to discover
      </h2>

      <div className="pb-3">
        {isLoading && (
          <div className="space-y-4 px-5 py-3" aria-label="Loading suggested users">
            {[0, 1, 2].map((item) => (
              <div key={item} className="flex animate-pulse items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/[0.07]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-white/[0.07]" />
                  <div className="h-2.5 w-16 rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && suggestedUsers.length === 0 && (
          <p className="px-5 py-4 text-sm leading-6 text-[#71808e]">
            New creators will appear here as the community grows.
          </p>
        )}

        {suggestedUsers.map((user: Record<string, any>) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            className="flex items-center gap-3 px-5 py-3 transition hover:bg-white/[0.035]"
          >
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                src={user.profileImage || "/images/placeholder.png"}
                fill
                sizes="40px"
                alt=""
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-[#71808e]">@{user.username}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SuggestedUsersCard;
