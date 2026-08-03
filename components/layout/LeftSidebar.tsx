import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiBell, FiHome, FiLogOut, FiUser } from "react-icons/fi";

import Avatar from "@/components/avatar";
import SidebarItem from "@/components/layout/SidebarItem";
import SidebarWoolsButton from "@/components/layout/SidebarWoolsButton";
import useCurrentUser from "@/hooks/useCurrentUser";

const LeftSidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    { label: "Home", href: "/", icon: FiHome },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FiBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: currentUser ? `/users/${currentUser.id}` : "/",
      icon: FiUser,
      auth: true,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen md:block" aria-label="Primary navigation">
      <div className="flex h-full flex-col px-3 py-5 xl:px-2">
        <Link
          href="/"
          aria-label="Wools home"
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 shadow-[0_0_24px_rgba(38,151,243,0.12)] transition hover:scale-[1.03] hover:bg-sky-400/15 xl:ml-2"
        >
          <Image
            src="/wools.png"
            width={264}
            height={285}
            alt=""
            priority
            className="h-[34px] w-auto"
          />
        </Link>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>

        <SidebarWoolsButton />

        <div className="mt-auto">
          {currentUser ? (
            <div className="group flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-[#242a31] hover:bg-white/[0.04] xl:p-3">
              <Avatar userId={currentUser.id} />
              <div className="hidden min-w-0 flex-1 xl:block">
                <p className="truncate text-sm font-semibold text-white">
                  {currentUser.name || "Wools member"}
                </p>
                <p className="truncate text-xs text-[#8b98a5]">
                  @{currentUser.username || "member"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                aria-label="Log out"
                title="Log out"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8b98a5] transition hover:bg-red-500/10 hover:text-red-400 xl:flex"
              >
                <FiLogOut size={18} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <p className="hidden px-3 text-xs leading-5 text-[#687582] xl:block">
              Join the conversation and share what matters to you.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
