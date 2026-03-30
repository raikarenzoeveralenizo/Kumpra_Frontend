import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoreCard from "@/components/ui/StoreCard";
import { stores } from "@/data/stores";

export default function FeaturedStores() {
  return (
    <section className="container-shell py-12">
      {/* Header with Title and View All Link */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Best Selling Stores</h2>
        <Link 
          href="/stores" 
          className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-md
            text-sm font-semibold

            text-slate-600
            transition-all duration-200

            hover:bg-[#d98b2b]
            hover:text-white
          "
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stores.slice(0, 3).map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}