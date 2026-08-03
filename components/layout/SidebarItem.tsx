import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const isActive = !(auth && !currentUser) && (href === "/"
    ? router.pathname === "/"
    : Boolean(href && router.asPath.startsWith(href)));

  const content = (
    <>
      <span
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isActive ? "bg-sky-400/15 text-sky-400" : "text-[#a7b1bc] group-hover:bg-white/[0.05] group-hover:text-white"
        }`}
      >
        <Icon size={22} aria-hidden="true" />
        {alert && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-[#080a0d]" />
        )}
      </span>
      <span className={`hidden text-[15px] font-medium xl:block ${isActive ? "text-white" : "text-[#a7b1bc] group-hover:text-white"}`}>
        {label}
      </span>
      {isActive && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-sky-400 xl:block" />}
    </>
  );

  const className = "group flex w-full items-center gap-3 rounded-2xl px-1 py-1.5 transition-colors xl:px-2";

  if (auth && !currentUser) {
    return (
      <button type="button" onClick={loginModal.onOpen} className={className} aria-label={label}>
        {content}
      </button>
    );
  }

  return href ? (
    <Link href={href} className={className} aria-current={isActive ? "page" : undefined} aria-label={label}>
      {content}
    </Link>
  ) : null;
};

export default SidebarItem;
