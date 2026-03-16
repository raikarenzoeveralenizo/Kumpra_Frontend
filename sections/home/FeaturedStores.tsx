import StoreCard from "@/components/ui/StoreCard";
import { stores } from "@/data/stores";

export default function FeaturedStores() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#07245e]">Featured Stores</h2>
        <p className="mt-1 text-slate-500">Explore products by store and branch.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}