import Link from "next/link";
import { useRouter } from "next/router";
import { FiBell, FiEdit3, FiHome, FiUser } from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

const MobileBottomNavigation = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const items = [
    { label: "Home", href: "/", icon: FiHome, active: router.pathname === "/" },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FiBell,
      active: router.pathname === "/notifications",
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: currentUser ? `/users/${currentUser.id}` : "/",
      icon: FiUser,
      active: router.pathname === "/users/[userId]" && router.query.userId === currentUser?.id,
      auth: true,
    },
  ];

  const handleCompose = () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    router.push("/#composer");
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#242a31] bg-[#0b0e12]/90 px-[max(1rem,env(safe-area-inset-left))] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {items.slice(0, 2).map(({ label, href, icon: Icon, active, auth, alert }) => {
          const itemClass = `relative flex h-11 w-14 items-center justify-center rounded-xl transition ${active ? "bg-sky-400/10 text-sky-400" : "text-[#8b98a5] hover:bg-white/[0.05] hover:text-white"}`;
          if (auth && !currentUser) {
            return (
              <button key={label} type="button" className={itemClass} onClick={loginModal.onOpen} aria-label={label}>
                <Icon size={22} aria-hidden="true" />
              </button>
            );
          }
          return (
            <Link key={label} href={href} className={itemClass} aria-label={label} aria-current={active ? "page" : undefined}>
              <Icon size={22} aria-hidden="true" />
              {alert && <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-[#0b0e12]" />}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleCompose}
          className="flex h-11 w-11 -translate-y-3 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-[0_8px_24px_rgba(14,165,233,0.35)] transition hover:scale-105"
          aria-label="Create a wool"
        >
          <FiEdit3 size={20} aria-hidden="true" />
        </button>

        {items.slice(2).map(({ label, href, icon: Icon, active, auth }) => {
          const itemClass = `flex h-11 w-14 items-center justify-center rounded-xl transition ${active ? "bg-sky-400/10 text-sky-400" : "text-[#8b98a5] hover:bg-white/[0.05] hover:text-white"}`;
          if (auth && !currentUser) {
            return (
              <button key={label} type="button" className={itemClass} onClick={loginModal.onOpen} aria-label={label}>
                <Icon size={22} aria-hidden="true" />
              </button>
            );
          }
          return (
            <Link key={label} href={href} className={itemClass} aria-label={label} aria-current={active ? "page" : undefined}>
              <Icon size={22} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
