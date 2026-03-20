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

export default function CheckoutPage() {
  const [mode, setMode] = useState<"delivery" | "pickup" | null>(null);
  const [selectedStore, setSelectedStore] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="container-shell py-12">
        <h1 className="text-4xl font-serif font-bold text-brand-blue tracking-tight">Checkout</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          
          <div className="space-y-10">
            {/* Receiving Mode Selection */}
            <div className="space-y-6">
               <h3 className="text-xl font-serif font-bold text-brand-blue">
                 How would you like to receive your order?
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <button 
                   onClick={() => setMode("delivery")}
                   className={`flex flex-col gap-2 rounded-2xl border-2 p-6 text-left transition-all ${
                     mode === "delivery" 
                      ? "border-[#3a9688] bg-[#f8faf9]" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                   }`}
                 >
                   <Truck className={`h-8 w-8 ${mode === "delivery" ? "text-[#3a9688]" : "text-slate-400"}`} />
                   <span className="text-lg font-bold text-brand-blue">Delivery</span>
                   <span className="text-sm font-medium text-slate-400">Delivered to your address</span>
                 </button>

                 <button 
                   onClick={() => setMode("pickup")}
                   className={`flex flex-col gap-2 rounded-2xl border-2 p-6 text-left transition-all ${
                     mode === "pickup" 
                      ? "border-[#3a9688] bg-[#f8faf9]" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                   }`}
                 >
                   <Store className={`h-8 w-8 ${mode === "pickup" ? "text-[#3a9688]" : "text-slate-400"}`} />
                   <span className="text-lg font-bold text-brand-blue">Pickup</span>
                   <span className="text-sm font-medium text-slate-400">Pick up at a store near you</span>
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
                  className="space-y-8"
                >
                  <div className="border-t border-slate-100 pt-8">
                    <h3 className="text-2xl font-serif font-bold text-brand-blue mb-6 tracking-tight">Delivery Address</h3>
                    <div className="rounded-2xl border border-slate-100 p-1 bg-white">
                       <DeliveryAddressForm />
                    </div>
                  </div>
                  <PaymentSection />
                </motion.div>
              )}

              {/* PICKUP MODE */}
              {mode === "pickup" && (
                <motion.div
                  key="pickup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="border-t border-slate-100 pt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-serif font-bold text-brand-blue tracking-tight">
                        {selectedStore ? "Your Selected Branch" : "Select Pickup Branch"}
                      </h3>
                      {selectedStore && (
                        <button 
                          onClick={() => setSelectedStore(null)}
                          className="text-xs font-bold text-[#3a9688] hover:underline flex items-center gap-1"
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
                        className="mb-6 rounded-2xl border-2 border-[#3a9688] bg-[#f8faf9] p-6 flex items-center gap-4"
                      >
                        <div className="h-12 w-12 rounded-full bg-[#3a9688] flex items-center justify-center shadow-sm text-white">
                          <Store className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-brand-blue leading-tight">{selectedStore.name}</p>
                          <p className="text-sm text-slate-500 mt-1">{selectedStore.address}</p>
                        </div>
                        <MapPin className="h-5 w-5 text-[#3a9688] opacity-40" />
                      </motion.div>
                    )}

                    {/* Pass the selection state so it knows to hide the list but keep the map/time */}
                    <PickupBranchSelector 
                      onSelect={(store: any) => setSelectedStore(store)} 
                      selectedStore={selectedStore}
                    />
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-6 border border-dashed border-slate-200">
                    <p className="text-sm text-slate-500 text-center font-medium">
                      Payment for pickup orders will be settled at the store branch.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <CheckoutSummary />
              <Link 
                href={(mode === "delivery" || (mode === "pickup" && selectedStore)) ? "/tracking/o1" : "#"} 
                className={`flex w-full items-center justify-center rounded-xl py-4 text-lg font-bold text-white transition-all ${
                  (mode === "delivery" || (mode === "pickup" && selectedStore)) 
                    ? "bg-[#3a9688] hover:bg-[#148a78] shadow-lg shadow-[#3a9688]/20" 
                    : "bg-slate-200 cursor-not-allowed pointer-events-none"
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

function PaymentSection() {
  return (
    <div className="border-t border-slate-100 pt-8">
      <h3 className="text-2xl font-serif font-bold text-brand-blue mb-6 tracking-tight">Payment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="rounded-2xl border-2 border-orange-500 bg-orange-50/50 p-5 text-left font-bold text-brand-blue">
          Cash on Delivery
        </button>
        <button className="rounded-2xl border-2 border-slate-100 p-5 text-left font-bold text-slate-400 hover:border-slate-200 transition-all">
          Online Payment
        </button>
      </div>
    </div>
  );
}