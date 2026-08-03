import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="relative">
      <FiSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#71808e]"
        size={18}
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label="Search Wools"
        placeholder="Search Wools"
        className="h-12 w-full rounded-2xl border border-[#242a31] bg-[#101419] pl-11 pr-4 text-sm text-white placeholder:text-[#71808e] transition focus:border-sky-400/70 focus:bg-[#131920] focus:ring-2 focus:ring-sky-400/20"
      />
    </div>
  );
};

export default SearchBox;
