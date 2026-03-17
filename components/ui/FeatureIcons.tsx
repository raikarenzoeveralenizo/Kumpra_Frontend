import Link from "next/link";

const features = [
  { title: "Flash Deals", icon: "⚡" },
  { title: "Free Shipping", icon: "🚚" },
  { title: "Rewards", icon: "🪙" },
  { title: "Mall", icon: "🏬" },
];

export default function FeatureIcons() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {features.map((feature) => (
        <Link 
          key={feature.title} 
          href="/products"
          className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-white hover:border-orange-200 hover:shadow-md transition-all active:scale-95 text-left"
        >
          {/* Icon Container */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl group-hover:bg-orange-500 group-hover:rotate-6 transition-all">
            {feature.icon}
          </div>

          {/* Text Content */}
          <div>
            <h3 className="font-semibold text-[#07245e] group-hover:text-orange-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-xs text-slate-500">
              Explore now
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}