import SearchBox from "@/components/layout/SearchBox";
import SuggestedUsersCard from "@/components/layout/SuggestedUsersCard";
import TrendingCard from "@/components/layout/TrendingCard";

const RightSidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen py-5 xl:block" aria-label="Discover">
      <div className="flex h-full flex-col gap-4 overflow-y-auto px-1 pb-5">
        <SearchBox />
        <TrendingCard />
        <SuggestedUsersCard />
        <p className="px-2 text-xs leading-5 text-[#5f6b77]">
          © {new Date().getFullYear()} Wools · Made for thoughtful conversations.
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
