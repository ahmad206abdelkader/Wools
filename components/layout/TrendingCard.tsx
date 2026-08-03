import { FiTrendingUp } from "react-icons/fi";

const trends = [
  { category: "Design · Trending", topic: "#DigitalCraft", posts: "2.8K wools" },
  { category: "Technology · Trending", topic: "Open source", posts: "8.4K wools" },
  { category: "Community · Popular", topic: "Build in public", posts: "1.2K wools" },
];

const TrendingCard = () => {
  return (
    <section className="surface-card overflow-hidden" aria-labelledby="trending-title">
      <div className="flex items-center gap-2 px-5 pb-2 pt-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400">
          <FiTrendingUp size={17} aria-hidden="true" />
        </span>
        <h2 id="trending-title" className="font-semibold text-white">Trending now</h2>
      </div>

      <div className="py-2">
        {trends.map((trend) => (
          <div key={trend.topic} className="px-5 py-3 transition hover:bg-white/[0.035]">
            <p className="text-xs text-[#71808e]">{trend.category}</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">{trend.topic}</p>
            <p className="mt-0.5 text-xs text-[#71808e]">{trend.posts}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCard;
