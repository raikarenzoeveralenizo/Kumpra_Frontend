"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeliveryAddressForm from "@/components/ui/DeliveryAddressForm";
import PickupBranchSelector from "@/components/ui/PickupBranchSelector";
import CheckoutSummary from "@/sections/checkout/CheckoutSummary";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Truck, Store, X, MapPin } from "lucide-react";
import { useCart } from "@/store/useCart";
import PaymentMethod from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  const [mode, setMode] = useState<"delivery" | "pickup" | null>(null);
  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />
      
      <section className="container-shell py-8">
        <h1 className="text-3xl font-serif font-bold text-brand-blue tracking-tight md:text-[32px]">
          Checkout
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          
          <div className="space-y-8">
            {/* Receiving Mode Selection */}
            <div className="space-y-5">
               <h3 className="text-lg font-serif font-bold text-brand-blue">
                 How would you like to receive your order?
               </h3>
               
               <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                 <button 
                   onClick={() => setMode("delivery")}
                   className={`flex flex-col gap-1.5 rounded-xl border-2 p-4 text-left transition-all ${
                     mode === "delivery" 
                      ? "border-[#3a9688] bg-[#f8faf9]" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                   }`}
                 >
                   <Truck className={`h-6 w-6 ${mode === "delivery" ? "text-[#3a9688]" : "text-slate-400"}`} />
                   <span className="text-base font-bold text-brand-blue">Delivery</span>
                   <span className="text-xs font-medium text-slate-400">Delivered to your address</span>
                 </button>

                 <button 
                   onClick={() => setMode("pickup")}
                   className={`flex flex-col gap-1.5 rounded-xl border-2 p-4 text-left transition-all ${
                     mode === "pickup" 
                      ? "border-[#3a9688] bg-[#f8faf9]" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                   }`}
                 >
                   <Store className={`h-6 w-6 ${mode === "pickup" ? "text-[#3a9688]" : "text-slate-400"}`} />
                   <span className="text-base font-bold text-brand-blue">Pickup</span>
                   <span className="text-xs font-medium text-slate-400">Pick up at a store near you</span>
                 </button>
               </div>
            </div>

            <AnimatePresence mode="wait">
              {/* DELIVERY MODE */}
              {mode === "delivery" && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-t border-slate-100 pt-6">
                    <div className="rounded-xl border border-slate-100 bg-white p-1">
                       <DeliveryAddressForm />
                    </div>
                  </div>
                  <PaymentMethod />
                </motion.div>
              )}

              {/* PICKUP MODE */}
              {mode === "pickup" && (
                <motion.div
                  key="pickup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-t border-slate-100 pt-6">
                    <div className="mb-4 flex items-center justify-between">
                    
                      {selectedStore && (
                        <button 
                          onClick={() => setSelectedStore(null)}
                          className="flex items-center gap-1 text-[11px] font-bold text-[#3a9688] hover:underline"
                        >
                          <X className="h-3 w-3" /> Change Branch
                        </button>
                      )}
                    </div>

                    {/* Show selected store details in a premium card */}
                    {selectedStore && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 flex items-center gap-3 rounded-xl border-2 border-[#3a9688] bg-[#f8faf9] p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a9688] text-white shadow-sm">
                          <Store className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-bold leading-tight text-brand-blue">
                            {selectedStore.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {selectedStore.address}
                          </p>
                        </div>
                        <MapPin className="h-4 w-4 text-[#3a9688] opacity-40" />
                      </motion.div>
                    )}

                    {/* Pass the selection state so it knows to hide the list but keep the map/time */}
                    <PickupBranchSelector 
                      onSelect={(store: any) => setSelectedStore(store)} 
                      selectedStore={selectedStore}
                    />
                  </div>
                  
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                    <p className="text-center text-xs font-medium text-slate-500">
                      Payment for pickup orders will be settled at the store branch.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="sticky top-24 space-y-4">
              <CheckoutSummary items={items} />
              <Link 
                href={(mode === "delivery" || (mode === "pickup" && selectedStore)) ? "/tracking/o1" : "#"} 
                className={`flex w-full items-center justify-center rounded-xl py-3 text-base font-bold text-white transition-all ${
                  (mode === "delivery" || (mode === "pickup" && selectedStore)) 
                    ? "bg-[#3a9688] shadow-lg shadow-[#3a9688]/20 hover:bg-[#148a78]" 
                    : "pointer-events-none cursor-not-allowed bg-slate-200"
                }`}
              >
                Place Order
              </Link>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}

