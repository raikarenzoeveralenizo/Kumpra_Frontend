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
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      triggerFlyToCart(centerX, centerY);
    }

    addItem(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f8fafc]">
        <img
          src={product.image || "/img/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasDiscount && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      <div className="p-3.5">
        <p className="text-[11px] font-medium text-slate-400">
          {store?.name || "Downtown Fresh Market"}
        </p>

        <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold leading-tight text-[#2f8f83] transition-colors group-hover:text-[#26776d]">
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span className="text-[13px] font-medium text-slate-700">
            {product.rating}
          </span>
          <span className="text-[12px] text-slate-400">(124)</span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-bold text-slate-900">
              {formatPrice(finalPrice)}
            </span>

            {hasDiscount && (
              <span className="text-[13px] text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="relative shrink-0" ref={buttonRef}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                isAnimating
                  ? "border-[#2f8f83] bg-[#2f8f83] text-white shadow-[0_0_15px_rgba(47,143,131,0.25)]"
                  : "border-slate-300 bg-white text-slate-500 hover:border-[#de922f] hover:bg-[#de922f] hover:text-white"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
}