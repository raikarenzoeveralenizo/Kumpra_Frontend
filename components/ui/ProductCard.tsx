"use client"; // Required for Zustand hooks

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart"; // Import your new store

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem); // Access the addItem function
  const store = stores.find((item) => item.id === product.storeId);
  const finalPrice = discountedPrice(product.price, product.discountPercent);
  const hasDiscount = product.discountPercent > 0;

  // Handler to add item to cart without navigating
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image || "/img/placeholder.jpg"} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        /> 
        
        {hasDiscount && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
          {store?.name || "Downtown Fresh Market"}
        </p>
        
        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-[#3a9688]">
          {product.name}
        </h3>
        
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">(124)</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Functional Cart Icon */}
          <div 
            onClick={handleAddToCart}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-[#3a9688] hover:bg-[#3a9688] hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}