"use client";

import { use, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, MapPin, Minus, Plus, Star } from "lucide-react";
import { products } from "@/data/products";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((item) => item.slug === resolvedParams.slug);

  const [quantity, setQuantity] = useState(1);
  
  // Stores
  const addItem = useCart((state) => state.addItem);
  const triggerFlyToCart = useAnimationStore((state) => state.triggerFlyToCart);

  if (!product) return <div className="p-20 text-center text-slate-500">Product not found</div>;

  const store = stores.find((item) => item.id === product.storeId);
  const finalPrice = discountedPrice(product.price, product.discountPercent);
  const savings = product.price - finalPrice;

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // 1. Add to Cart: Stays in the store + Animation
  const handleAddToCartWithAnimation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    triggerFlyToCart(startX, startY);

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  /**
   * 2. Buy Now: Direct bypass.
   * We don't call addItem(). Instead, we navigate to checkout 
   * with the product ID and quantity in the URL.
   */
  const buyNowUrl = `/checkout?directBuy=true&productId=${product.id}&qty=${quantity}`;

  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      <section className="container-shell py-8">
        <Link href="/home" className="flex items-center gap-1 text-xs text-slate-500 hover:text-black mb-6 transition-colors">
          <ChevronLeft className="h-3 w-3" /> Back
        </Link>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Image Container */}
          <div className="rounded-3xl bg-[#fce4ec] flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-[500px] shadow-sm">
             {product.image ? (
               <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
             ) : (
               <span className="text-slate-400 italic">Product Image</span>
             )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{product.category}</p>
            <h1 className="mt-2 text-4xl font-serif font-bold text-slate-900">{product.name}</h1>
            
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
              <span className="text-sm font-bold text-slate-700">{product.rating}</span>
              <span className="text-sm text-slate-400">(124 reviews)</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(finalPrice)}</span>
              {product.discountPercent > 0 && (
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-md">{product.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-900">Quantity</span>
              <div className="flex items-center rounded-lg border border-slate-200 p-1">
                <button onClick={decrement} className="p-1 text-slate-400 hover:text-black"><Minus className="h-4 w-4" /></button>
                <span className="px-4 font-semibold w-8 text-center">{quantity}</span>
                <button onClick={increment} className="p-1 text-slate-400 hover:text-black"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {/* BUTTON 1: Adds to persistent cart + Fly Animation */}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCartWithAnimation}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#3a9688] py-4 font-bold text-white transition-all hover:bg-[#2d7a6e]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </motion.button>
              
              {/* BUTTON 2: Direct Checkout + No Animation + Doesn't touch cart store */}
              <Link 
                href={buyNowUrl}
                className="flex flex-1 items-center justify-center rounded-lg bg-[#faf3e8] py-4 font-bold text-[#d4a373] transition-colors hover:bg-[#f5ebd8] active:scale-95"
              >
                Buy Now
              </Link>
            </div>

            {/* Store Card ... */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-tight">Sold by</p>
              <p className="mt-1 font-bold text-slate-900 text-lg">{store?.name}</p>
              <Link href={`/store/${store?.slug}`} className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <MapPin className="h-4 w-4 text-[#3a9688]" />
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