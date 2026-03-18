"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  
  // 1. Corrected trigger name to match your @/store/useAnimationStore.ts
  const triggerFlyToCart = useAnimationStore((state) => state.triggerFlyToCart);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const store = stores.find((item) => item.id === product.storeId);
  const finalPrice = discountedPrice(product.price, product.discountPercent);
  const hasDiscount = product.discountPercent > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (buttonRef.current) {
      // 2. Get the button center for a precise flight start
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 3. Trigger the single function from your store
      triggerFlyToCart(centerX, centerY);
    }

    addItem(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:shadow-md hover:-translate-y-0.5"
    >
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

      <div className="p-4">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight font-serif">
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
          </div>

          <div className="relative" ref={buttonRef}>
            <motion.div 
              whileTap={{ scale: 0.8 }}
              onClick={handleAddToCart}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all ${
                isAnimating 
                ? "border-[#3a9688] bg-[#3a9688] text-white shadow-[0_0_15px_rgba(58,150,136,0.3)]" 
                : "border-slate-200 text-slate-400 hover:border-[#3a9688]"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}