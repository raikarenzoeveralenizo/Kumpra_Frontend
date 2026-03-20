"use client"; // Must be a client component to use the store hooks

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart"; // Import your Zustand store
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function CartPage() {
  // 1. Grab the state and actions from your store
  const { items, removeItem, updateQuantity } = useCart();

  const [activeButtons, setActiveButtons] = useState<Record<string, "plus" | "minus" | null>>({});

  const handleButtonFlash = (itemId: string | number, type: "plus" | "minus") => {
    setActiveButtons((prev) => ({
      ...prev,
      [itemId]: type,
    }));

    setTimeout(() => {
      setActiveButtons((prev) => ({
        ...prev,
        [itemId]: null,
      }));
    }, 200);
  };

  // 2. Calculate the actual subtotal based on items in cart
  const subtotal = items.reduce((acc, item) => {
    const price = discountedPrice(item.price, item.discountPercent);
    return acc + price * item.quantity;
  }, 0);

  // 3. Handle the "Empty Cart" state gracefully
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="container-shell flex flex-col items-center justify-center py-32 text-center">
          <div className="rounded-full bg-slate-50 p-6">
            <ShoppingBag className="h-12 w-12 text-slate-300" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-2 text-slate-500">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/"
            className="mt-8 rounded-lg bg-[#3a9688] px-8 py-3 font-bold text-white transition-all hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="container-shell py-12">
        <h1 className="font-serif text-3xl font-bold text-brand-blue">Shopping Cart</h1>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.8fr_1fr]">
          
          {/* Cart Items List */}
          <div className="space-y-4">
            {items.map((item) => {
              const unitPrice = discountedPrice(item.price, item.discountPercent);
              const itemTotal = unitPrice * item.quantity;
              const activeButton = activeButtons[item.id];

              return (
                <div key={item.id} className="flex gap-4 rounded-xl border border-slate-100 p-4 shadow-sm">
                  {/* Product Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <img
                      src={item.image || "/img/placeholder.jpg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.name}</h3>
                      <p className="text-xs text-slate-400">Downtown Fresh Market</p>

                      {/* Unit Price */}
                      <p className="mt-1 font-bold text-slate-900">
                        {formatPrice(unitPrice)}
                      </p>

                      {/* Total Price per Product */}
                      <p className="mt-1 text-sm font-medium text-[#3a9688]">
                        Total: {formatPrice(itemTotal)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-3 flex w-fit items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
                      
                      {/* Minus */}
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-all duration-200 hover:bg-[#de922f] hover:text-white"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      {/* Quantity */}
                      <span className="px-4 text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-all duration-200 hover:bg-[#de922f] hover:text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                    </div>

                    
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-end pb-1">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-red-500 transition-all duration-200 hover:bg-[#de922f] hover:text-white"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Sidebar */}
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-brand-blue tracking-tight">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Delivery/Pickup</span>
                <span className="font-medium text-slate-400">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  Total
                </span>
                <span className="text-xl font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-xl bg-[#3a9688] py-4 font-semibold text-white transition-all duration-300 hover:bg-[#2f7f73] active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}