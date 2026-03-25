"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { orders } from "@/data/orders";
import DeliveryStatusCard from "@/components/ui/DeliveryStatusCard";
import OrderProgressTracker from "@/components/ui/OrderProgressTracker";
import RiderAssignedCard from "@/components/ui/RiderAssignedCard";
import { Copy, Truck, Clock3, Store, Package, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { discountedPrice, formatPrice } from "@/lib/utils";
import Link from "next/link";

type StoredOrder = {
  id: string;
  orderNumber: string;
  orderType: "delivery" | "pickup";
  assignedStore: string;
  estimatedDeliveryTime: string;
  status: string;
  currentStep: number;
  deliveryAddress?: string;
  paymentMethod?: string;
  deliveryFee?: number;
  selectedStore?: any;
  selectedAddress?: any;
};

export default function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const fallbackOrder = orders.find((item) => item.id === id) || orders[0];
  const { items } = useCart();
  const [storedOrder, setStoredOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("latest_checkout_order");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed?.id === id) {
        setStoredOrder(parsed);
      }
    } catch (error) {
      console.error("Failed to parse latest checkout order:", error);
    }
  }, [id]);

  const order = useMemo(() => {
    if (storedOrder) return storedOrder;

    return {
      ...fallbackOrder,
      orderType: (fallbackOrder.orderType || "delivery") as "delivery" | "pickup",
      paymentMethod: "Cash On Delivery",
      deliveryFee: 0,
    };
  }, [storedOrder, fallbackOrder]);

  const isPickup = order.orderType === "pickup";

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = discountedPrice(item.price, item.discountPercent || 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryFee = isPickup ? 0 : order.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  const pickupSteps = [
    {
      label: "Preparing Item",
      subtext: "In progress...",
    },
    {
      label: "Ready for Pickup",
      subtext: "Awaiting customer pickup",
    },
    {
      label: "Picked Up",
      subtext: "Order completed",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="container-shell py-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf7f4]">
              <CheckCircle2 className="h-7 w-7 text-[#2f8f83]" />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-brand-blue">
              Order Placed Successfully!
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Thank you for your order
            </p>
          </div>

          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Order Number */}
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Order Number
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <h1 className="text-lg font-bold text-brand-blue sm:text-xl">
                    {order.orderNumber}
                  </h1>

                  <button
                    type="button"
                    className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Order Type */}
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Order Type
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {isPickup ? (
                    <Store className="h-4 w-4 text-[#2f8f83]" />
                  ) : (
                    <Truck className="h-4 w-4 text-[#2f8f83]" />
                  )}

                  <p className="text-sm font-semibold text-brand-blue">
                    {isPickup ? "Pickup" : "Delivery"}
                  </p>
                </div>
              </div>

              {/* Assigned Store */}
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Assigned Store
                </p>

                <p className="mt-2 text-sm font-semibold text-brand-blue">
                  {order.assignedStore}
                </p>
              </div>

              {/* Estimated Time */}
              <div className="rounded-xl bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Estimated Time
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-[#2f8f83]" />
                  <p className="text-sm font-semibold text-brand-blue">
                    {order.estimatedDeliveryTime}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="mx-auto w-full max-w-3xl">
            <DeliveryStatusCard status={order.status} />
          </div>

          {isPickup ? (
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-brand-blue">Pickup Progress</h3>

            <div className="relative mt-8 grid grid-cols-3">
              {pickupSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = order.currentStep === stepNumber;
                const isDone = order.currentStep > stepNumber;
                const isLast = index === pickupSteps.length - 1;

                return (
                  <div key={step.label} className="relative flex flex-col items-center text-center">
                    {!isLast && (
                      <div className="absolute left-1/2 top-5 h-0.5 w-full">
                        <div
                          className={`ml-5 h-full w-[calc(100%-2.5rem)] ${
                            isDone ? "bg-[#2f8f83]" : "bg-slate-300"
                          }`}
                        />
                      </div>
                    )}

                    <div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ${
                        isActive || isDone
                          ? "border-[#2f8f83] text-[#2f8f83]"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {stepNumber === 1 && <Package className="h-4 w-4" />}
                      {stepNumber === 2 && <Clock3 className="h-4 w-4" />}
                      {stepNumber === 3 && <Store className="h-4 w-4" />}
                    </div>

                    <p
                      className={`mt-4 text-sm font-semibold leading-5 ${
                        isActive || isDone ? "text-[#2f8f83]" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>

                    <p className="mt-1 max-w-40 text-xs leading-5 text-slate-400">
                      {step.subtext}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto w-full max-w-3xl">
              <OrderProgressTracker currentStep={order.currentStep} />
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <RiderAssignedCard order={order as any} />
            </div>
          </>
        )}

          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <h3 className="text-lg font-bold text-brand-blue">Products Ordered</h3>

            <div className="mt-6">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500">No ordered items found.</p>
              ) : (
                <>
                  {/* Product List */}
                  <div className="space-y-4">
                    {items.map((item) => {
                      const unitPrice = discountedPrice(
                        item.price,
                        item.discountPercent || 0
                      );
                      const itemTotal = unitPrice * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 px-2 sm:px-3"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
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
                              <p className="text-base font-semibold text-brand-blue">
                                {item.name}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="text-lg font-semibold text-brand-blue pr-1">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-slate-200" />

                  {/* Summary */}
                  <div className="space-y-3 px-2 sm:px-3">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
                    </div>

                    {!isPickup && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-sm">Delivery Fee</span>
                        <span className="text-sm font-medium">
                          {formatPrice(deliveryFee)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-sm">Payment</span>
                      <span className="text-sm font-medium">
                        {order.paymentMethod || "Cash On Delivery"}
                      </span>
                    </div>

                    <div className="mt-3 border-t border-slate-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-brand-blue">Total</span>
                        <span className="text-lg font-bold text-brand-blue">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {!isPickup && (
            <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-brand-blue">Delivery Address</h3>
              <p className="mt-3 text-slate-600">{order.deliveryAddress}</p>
              <div className="mt-5 h-64 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                Map placeholder for live delivery tracking
              </div>
            </div>
          )}

          <div className="mx-auto w-full max-w-3xl">
            <Link
              href="/products"
              className="block w-full rounded-2xl bg-[#2f8f83] py-4 text-center text-lg font-semibold text-white transition hover:bg-[#26776d]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}