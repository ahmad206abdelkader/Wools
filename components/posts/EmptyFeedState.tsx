import { FiFeather } from "react-icons/fi";

interface EmptyFeedStateProps {
  title?: string;
  description?: string;
}

const EmptyFeedState: React.FC<EmptyFeedStateProps> = ({
  title = "The feed is quiet—for now",
  description = "Be the first to share an idea, a moment, or something worth talking about.",
}) => {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-400/[0.08] text-sky-400 shadow-[0_12px_40px_rgba(14,165,233,0.1)]">
        <div className="absolute inset-2 rounded-xl border border-sky-400/10" />
        <FiFeather size={26} aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[#71808e]">{description}</p>
    </div>
  );
};

export default EmptyFeedState;
