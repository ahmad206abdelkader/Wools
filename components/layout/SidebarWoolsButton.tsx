import { useRouter } from "next/router";
import { useCallback } from "react";
import { FiEdit3 } from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

const SidebarWoolsButton = () => {
    const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

    const onClick = useCallback(() => {
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      router.push("/#composer");
    }, [currentUser, loginModal, router]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 font-semibold text-white shadow-[0_10px_30px_rgba(14,165,233,0.18)] transition hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-400 hover:shadow-[0_12px_34px_rgba(14,165,233,0.26)] xl:w-full"
      aria-label="Create a wool"
    >
      <FiEdit3 size={20} className="xl:hidden" aria-hidden="true" />
      <span className="hidden xl:inline">Create a wool</span>
    </button>
  );
};

export default SidebarWoolsButton
