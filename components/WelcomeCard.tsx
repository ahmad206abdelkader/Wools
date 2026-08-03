import { FiArrowRight, FiMessageCircle, FiUsers } from "react-icons/fi";

import Button from "@/components/Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const WelcomeCard = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <section className="relative overflow-hidden border-b border-[#242a31] p-4 sm:p-5" aria-labelledby="welcome-heading">
      <div className="relative overflow-hidden rounded-3xl border border-sky-400/15 bg-gradient-to-br from-[#14202b] via-[#111820] to-[#101419] px-5 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.25)] sm:px-8 sm:py-9">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-52 w-52 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative max-w-lg">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10">
              <FiMessageCircle size={16} aria-hidden="true" />
            </span>
            Your community, closer
          </div>
          <h2 id="welcome-heading" className="text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Share what matters.
            <span className="block bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
              Find your people.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#a7b1bc] sm:text-base sm:leading-7">
            Wools is a calm place for fresh ideas, real conversations, and the moments worth passing on.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button label="Log in" onClick={loginModal.onOpen} />
            <Button label="Create account" onClick={registerModal.onOpen} secondary icon={FiArrowRight} />
          </div>

          <div className="mt-7 flex items-center gap-2 text-xs text-[#71808e]">
            <FiUsers size={15} aria-hidden="true" />
            Join a growing community of curious minds.
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;
