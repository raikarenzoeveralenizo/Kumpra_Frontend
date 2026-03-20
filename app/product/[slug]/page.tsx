"use client";

import { use, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  ChevronLeft,
  ShoppingCart,
  MapPin,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { products } from "@/data/products";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";
import { motion } from "framer-motion";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = products.find((item) => item.slug === resolvedParams.slug);

  const [quantity, setQuantity] = useState(1);
  const addToCartButtonRef = useRef<HTMLButtonElement>(null);

  const addItem = useCart((state) => state.addItem);
  const triggerFlyToCart = useAnimationStore(
    (state) => state.triggerFlyToCart
  );

  if (!product) {
    return <div className="p-20 text-center text-slate-500">Product not found</div>;
  }

  const store = stores.find((item) => item.id === product.storeId);
  const finalPrice = discountedPrice(product.price, product.discountPercent);
  const savings = product.price - finalPrice;

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCartWithAnimation = () => {
    if (addToCartButtonRef.current) {
      const rect = addToCartButtonRef.current.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      triggerFlyToCart(startX, startY);
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const buyNowUrl = `/checkout?directBuy=true&productId=${product.id}&qty=${quantity}`;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="container-shell py-7">
        <Link
          href="/home"
          className="mb-6 flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-brand-blue"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="w-full max-w-95 md:max-w-105 rounded-2xl bg-[#fce4ec] shadow-sm overflow-hidden">
              <div className="aspect-square">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 italic">
                    Product Image
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-serif font-bold tracking-tight text-brand-blue md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#de922f] text-[#de922f]" />
              <span className="text-sm font-semibold text-slate-800">
                {product.rating}
              </span>
              <span className="text-sm text-slate-500">(124 reviews)</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-semibold text-slate-900 md:text-3xl">
                {formatPrice(finalPrice)}
              </span>

              {product.discountPercent > 0 && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}

              {product.discountPercent > 0 && (
                <span className="rounded-full bg-red-500 px-3 py-0.75 text-xs font-semibold text-white">
                  Save {formatPrice(savings)}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-900">
                Quantity
              </span>

              <div className="flex items-center rounded-md border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={decrement}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-[#de922f] hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="px-4 text-sm font-semibold text-slate-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increment}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-[#de922f] hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.button
                ref={addToCartButtonRef}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCartWithAnimation}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#3a9688] py-3.5 text-sm font-semibold text-white hover:bg-[#2d7a6e]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </motion.button>

              <Link
                href={buyNowUrl}
                className="flex flex-1 items-center justify-center rounded-md bg-[#faf3e8] py-3.5 text-sm font-medium text-[#8a5a2b] hover:bg-[#f5ebd8]"
              >
                Buy Now
              </Link>
            </div>

            <div className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase text-slate-500">
                Sold by
              </p>

              <p className="mt-1 text-lg font-semibold text-brand-blue">
                {store?.name}
              </p>

              <Link
                href={`/store/${store?.slug}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                <MapPin className="h-4 w-4 text-slate-700" />
                View Store Location
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}