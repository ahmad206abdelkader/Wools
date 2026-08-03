interface InputProps{
    placeholder?: string;
    value?:string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
  return (
   <input
    disabled={disabled}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    aria-label={placeholder}
    type={type}
    className="h-[52px] w-full rounded-xl border border-[#2b333c] bg-[#0d1116] px-4 py-3.5 text-[15px] text-white placeholder:text-[#687582] transition hover:border-[#3a444f] focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-60"
   />
  )
}

export default Input
