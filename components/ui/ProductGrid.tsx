import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}