"use client"; // Required to use the useCart hook

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import { useCart } from "@/store/useCart"; // Import your store

export default function Header() {
  // Get the items from the store
  const items = useCart((state) => state.items);
  
  // Calculate total quantity (sum of all item quantities)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/home" className="text-2xl font-extrabold text-[#07245e]">
            Kumpra.ph
          </Link>
        </div>

        {/* Search & Cart Section */}
        <div className="flex flex-1 items-center gap-2 md:max-w-3xl">
          <div className="relative flex-1">
            <SearchBar />
          </div>
          
          <Link 
            href="/cart" 
            className="relative rounded-xl bg-[#07245e] p-3 text-white transition-colors hover:bg-[#0a3180]"
          >
            <ShoppingCart className="h-5 w-5" />
            
            {/* Cart Badge - Only shows if itemCount > 0 */}
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white ring-2 ring-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}