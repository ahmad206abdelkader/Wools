import { useCallback, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      >
        <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-[#2b333c] bg-[#101419] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-[#242a31] px-5 py-4 sm:px-6">
              <h3 id="modal-title" className="text-xl font-bold tracking-[-0.02em] text-white">
                {title}
              </h3>
              <button
                type="button"
                aria-label="Close dialog"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#8b98a5] transition hover:bg-white/[0.06] hover:text-white"
                onClick={handleClose}
              >
                <AiOutlineClose size={19} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-auto overflow-y-auto px-5 py-6 sm:px-6">
              {body}
            </div>
            <div className="flex flex-col gap-2 border-t border-[#242a31] px-5 py-5 sm:px-6">
              <Button disabled={disabled} label={actionLabel} fullWidth larg onClick={handleSubmit} />
              {footer}
            </div>
        </div>
      </div>
  );
}

export default Modal;
