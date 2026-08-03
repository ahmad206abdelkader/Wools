import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  larg?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: IconType;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  larg,
  onClick,
  disabled,
  outline,
  icon: Icon,
  type = "button",
}) => {
  const appearance = outline
    ? "border-[#3a444f] bg-transparent text-white hover:border-[#56616d] hover:bg-white/[0.04]"
    : secondary
      ? "border-white bg-white text-[#0b0e12] hover:bg-slate-200"
      : "border-sky-500 bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-400 hover:to-blue-400";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : "w-fit"
      } ${larg ? "min-h-[50px] px-6 text-base" : "min-h-[42px] px-5 text-sm"} ${appearance}`}
    >
      {label}
      {Icon && <Icon size={17} aria-hidden="true" />}
    </button>
  );
};

export default Button;
