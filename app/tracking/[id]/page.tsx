"use client";

import { use } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { orders } from "@/data/orders";
import OrderProgressTracker from "@/components/ui/OrderProgressTracker";
import DeliveryStatusCard from "@/components/ui/DeliveryStatusCard";
import RiderAssignedCard from "@/components/ui/RiderAssignedCard";
import { Copy, Truck, Clock3 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { discountedPrice, formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = orders.find((item) => item.id === id) || orders[0];
  const { items } = useCart();

  return (
    <main className="bg-page min-h-screen">
      <Header />
      <section className="container-shell space-y-6 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#2f8f83]">
            Order Placed Successfully!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Thank you for your order
          </p>
        </div>

        <div className="card rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-xs text-slate-500">Order Number</p>

            <div className="mt-1 flex items-center gap-2">
              <h1 className="text-xl font-bold text-brand-blue sm:text-2xl">
                {order.orderNumber}
              </h1>

              <button
                type="button"
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-xs text-slate-500">Order Type</p>

              <div className="mt-1 flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#2f8f83]" />
                <p className="text-sm font-semibold capitalize text-brand-blue">
                  {order.orderType}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-xs text-slate-500">Assigned Store</p>

              <p className="mt-1 text-sm font-semibold text-brand-blue">
                {order.assignedStore}
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-xs text-slate-500">Estimated Time</p>

              <div className="mt-1 flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#2f8f83]" />
                <p className="text-sm font-semibold text-orange-500">
                  {order.estimatedDeliveryTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DeliveryStatusCard status={order.status} />
        <OrderProgressTracker currentStep={order.currentStep} />
        <RiderAssignedCard order={order} />

        {/* Ordered Products */}
        <div className="card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-brand-blue">Products Ordered</h3>

          <div className="mt-4">
            {items.length === 0 ? (
              <p className="text-xs text-slate-500">No ordered items found.</p>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => {
                    const unitPrice = discountedPrice(
                      item.price,
                      item.discountPercent || 0
                    );
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={item.image || "/img/placeholder.jpg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/img/placeholder.jpg";
                              }}
                            />
                          </div>

                          <div>
                            <p className="text-base font-medium leading-tight text-brand-blue">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="text-lg font-semibold text-blue-brand">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="my-4 border-t border-slate-200" />

                {(() => {
                  const subtotal = items.reduce((sum, item) => {
                    const unitPrice = discountedPrice(
                      item.price,
                      item.discountPercent || 0
                    );
                    return sum + unitPrice * item.quantity;
                  }, 0);

                  const deliveryFee = 0;
                  const total = subtotal + deliveryFee;

                  return (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm">Subtotal</span>
                        <span className="text-sm">{formatPrice(subtotal)}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm">Delivery Fee</span>
                        <span className="text-sm">{formatPrice(deliveryFee)}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-500">
                        <span className="text-sm">Payment</span>
                        <span className="text-sm">Cash On Delivery</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
                        <span className="text-lg font-bold text-brand-blue">Total</span>
                        <span className="text-lg font-bold text-brand-blue">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-bold text-brand-blue">Delivery Address</h3>
          <p className="mt-3 text-slate-600">{order.deliveryAddress}</p>
          <div className="mt-5 h-64 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
            Map placeholder for live delivery tracking
          </div>
        </div>

        <Link
          href="/products"
          className="block w-full rounded-2xl bg-[#2f8f83] py-4 text-center text-lg font-semibold text-white transition hover:bg-[#26776d]"
        >
          Continue Shopping
        </Link> 

      </section>
      <Footer />
    </main>
  );
}