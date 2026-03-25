import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/ui/ProductGrid";
import { products } from "@/data/products";

export default function HomeProducts() {
  return (
    <section className="container-shell py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Featured Products</h2>
        <Link href="/products" className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-black">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid items={products.slice(0, 4)} />
    </section>
  );
}