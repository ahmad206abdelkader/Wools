interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  larg?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  larg,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
      className={` disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2 ${
        fullWidth ? "w-full" : "w-fit"
      } ${secondary ? "bg-white" : "bg-sky-500"} ${
        secondary ? "text0-black" : "text-white"
      } ${secondary ? "border-black" : "border-sky-500"} ${
        larg ? "text-xl" : "text-md"
      } 
      ${larg ? "px-5" : "px-4"}
      ${larg ? "py-3" : "py-2"}
      ${outline ? "bg-transparent" : ""}
      ${outline ? "border-white" : ""}
      ${outline ? "text-white" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
