"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const items = useCart((state) => state.items);
  const uniqueItemCount = items.length;
  
  const isFlying = useAnimationStore((state) => state.isFlying);
  const setEndCoords = useAnimationStore((state) => state.setEndCoords);
  const startCoords = useAnimationStore((state) => state.startCoords);
  const endCoords = useAnimationStore((state) => state.endCoords);
  const resetFlight = useAnimationStore((state) => state.resetFlight);

  const cartIconRef = useRef<HTMLDivElement>(null);

  // Measure the target (Header Cart Icon) location
  useEffect(() => {
    const measureCart = () => {
      if (cartIconRef.current) {
        const rect = cartIconRef.current.getBoundingClientRect();
        // Target the exact center of the cart icon
        setEndCoords(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };

    measureCart();
    // Re-measure if window changes to keep coordinates accurate
    window.addEventListener("resize", measureCart);
    window.addEventListener("scroll", measureCart);
    
    return () => {
      window.removeEventListener("resize", measureCart);
      window.removeEventListener("scroll", measureCart);
    };
  }, [setEndCoords]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        
        <div className="flex items-center justify-between gap-4">
          <Link href="/home" className="text-2xl font-extrabold text-[#07245e]">
            Kumpra.ph
          </Link>
        </div>

        <div className="flex flex-1 items-center gap-2 md:max-w-3xl">
          <div className="relative flex-1">
            <SearchBar />
          </div>
          
          <div className="relative">
            {/* TARGET COMPONENT */}
            <motion.div
              ref={cartIconRef}
              animate={isFlying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                href="/cart" 
                className="relative rounded-xl bg-[#07245e] p-3 text-white transition-colors hover:bg-[#0a3180] flex items-center justify-center shadow-sm"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* RED BADGE: Matches image_b4a039.png */}
            <AnimatePresence>
              {uniqueItemCount > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={isFlying ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  className="pointer-events-none absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white"
                >
                  {uniqueItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* FLYING PARTICLE: Rendered with absolute positioning relative to viewport */}
      <AnimatePresence>
        {isFlying && startCoords && endCoords && (
          <motion.div
            key="flying-dot"
            className="fixed z-[9999] h-6 w-6 rounded-full bg-[#3a9688] shadow-lg flex items-center justify-center text-white pointer-events-none"
            initial={{ 
              top: startCoords.y, 
              left: startCoords.x, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              top: endCoords.y, 
              left: endCoords.x, 
              scale: 0.2, 
              opacity: 0.5 
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.45, 0, 0.55, 1], // Custom cubic-bezier for "curved" feel
            }}
            onAnimationComplete={resetFlight}
          >
            <ShoppingCart className="h-3 w-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}