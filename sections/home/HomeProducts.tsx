import ProductGrid from "@/components/ui/ProductGrid";
import { products } from "@/data/products";

export default function HomeProducts() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#07245e]">Recommended Products</h2>
        <p className="mt-1 text-slate-500">Marketplace-style product discovery from different stores.</p>
      </div>
      <ProductGrid items={products} />
    </section>
  );
}