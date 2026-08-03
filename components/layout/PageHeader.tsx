import { useRouter } from "next/router";
import { useCallback } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface PageHeaderProps {
  showBackArrow?: boolean;
  label: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ showBackArrow, label, description }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <header className="sticky top-0 z-30 border-b border-[#242a31] bg-[#0b0e12]/82 px-4 py-3 backdrop-blur-xl sm:px-5">
      <div className="flex min-h-[44px] items-center gap-3">
        {showBackArrow && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#a7b1bc] transition hover:bg-white/[0.06] hover:text-white"
          >
            <FiArrowLeft size={20} aria-hidden="true" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-[-0.015em] text-white sm:text-xl">{label}</h1>
          {description && <p className="mt-0.5 truncate text-xs text-[#71808e]">{description}</p>}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
