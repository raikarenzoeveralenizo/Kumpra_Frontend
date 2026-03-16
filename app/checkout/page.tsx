"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeliveryPickupSelector from "@/components/ui/DeliveryPickupSelector";
import DeliveryAddressForm from "@/components/ui/DeliveryAddressForm";
import PickupBranchSelector from "@/components/ui/PickupBranchSelector";
import CheckoutSummary from "@/sections/checkout/CheckoutSummary";
import Link from "next/link";

export default function CheckoutPage() {
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");

  return (
    <main>
      <Header />
      <section className="container-shell py-8">
        <h1 className="text-3xl font-bold text-[#07245e]">Checkout</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <DeliveryPickupSelector value={mode} onChange={setMode} />
            {mode === "delivery" ? <DeliveryAddressForm /> : <PickupBranchSelector />}
            <div className="card p-5">
              <h3 className="text-lg font-bold text-[#07245e]">Payment</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <button className="rounded-xl border border-orange-500 bg-orange-50 p-4 text-left font-semibold text-[#07245e]">Cash on Delivery</button>
                <button className="rounded-xl border border-slate-200 p-4 text-left font-semibold text-[#07245e]">Online Payment</button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <CheckoutSummary />
            <Link href="/tracking/o1" className="btn-primary w-full">Place Order</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}