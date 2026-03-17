import Link from "next/link";
import { Product } from "@/types/product";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const store = stores.find((item) => item.id === product.storeId);
  const finalPrice = discountedPrice(product.price, product.discountPercent);

  return (
    <div className="card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-slate-100" />
      <div className="space-y-3 p-4">
        {product.badge && (
          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            {product.badge}
          </span>
        )}
        <Link href={`/product/${product.slug}`} className="block line-clamp-2 font-semibold text-[#07245e]">
          {product.name}
        </Link>
        <p className="text-xs text-slate-500">Store: {store?.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-orange-500">{formatPrice(finalPrice)}</span>
          <span className="text-sm text-slate-400 line-through">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-500">★ {product.rating}</span>
          <span className="font-medium text-orange-500">-{product.discountPercent}%</span>
        </div>
      </div>
    </div>
  );
}