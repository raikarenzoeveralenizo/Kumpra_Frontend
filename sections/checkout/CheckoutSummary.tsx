"use client";

import Image from "next/image";
import { products } from "@/data/products";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function CheckoutSummary() {
  // Using the first two products as an example
  const items = products.slice(0, 2);
  const subtotal = items.reduce((sum, item) => sum + discountedPrice(item.price, item.discountPercent), 0);

  return (
    <div className="card p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-brand-blue">Order Summary</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* PRODUCT IMAGE */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <Image
                src={item.image} // Ensure your product data has an image URL
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 items-center justify-between gap-2">
              <div>
                <p className="font-medium text-brand-blue line-clamp-1">{item.name}</p>
                <p className="text-xs text-slate-500 font-medium">Qty: 1</p>
              </div>
              <p className="font-bold text-[#3a9688]">
                {formatPrice(discountedPrice(item.price, item.discountPercent))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Delivery Fee</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-lg font-bold text-brand-blue">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}