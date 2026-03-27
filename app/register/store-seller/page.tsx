"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShowcase from "@/components/auth/AuthShowcase";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  ChevronDown,
  MapPin,
  Upload,
} from "lucide-react";

export default function StoreSellerRegisterPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:flex">
      <AuthShowcase variant="seller" />

      <div className="flex min-h-screen w-full items-center justify-center px-3 py-4 sm:px-4 lg:w-1/2 lg:px-6">
        <div className="w-full max-w-115">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-4">
            <h1 className="text-lg font-serif font-bold text-[#0f172a] sm:text-xl">
              Store Seller Registration
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              {step === 1 && "Step 1 of 3 — Account Info"}
              {step === 2 && "Step 2 of 3 — Store Details"}
              {step === 3 && "Step 3 of 3 — Business Documents"}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div
                className={`h-1 rounded-full ${
                  step >= 1 ? "bg-[#2f8f83]" : "bg-slate-200"
                }`}
              />
              <div
                className={`h-1 rounded-full ${
                  step >= 2 ? "bg-[#2f8f83]" : "bg-slate-200"
                }`}
              />
              <div
                className={`h-1 rounded-full ${
                  step >= 3 ? "bg-[#2f8f83]" : "bg-slate-200"
                }`}
              />
            </div>

            {step === 1 && (
              <div className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Juan's Fresh Market"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Owner Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="store@example.com"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="+63 9XX XXX XXXX"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                    <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full rounded-lg bg-[#2f8f83] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26776d]"
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5 space-y-3.5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Store Category *
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20">
                      <option>Bakery & Pastries</option>
                      <option>Groceries</option>
                      <option>Fruits & Vegetables</option>
                      <option>Meat & Seafood</option>
                      <option>Beverages</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Store Address *
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">
                      Province
                    </label>
                    <input
                      type="text"
                      placeholder="Province"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div className="max-w-45">
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1000"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Store Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell customers what your store is about..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                  />
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-lg bg-[#2f8f83] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26776d]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-5 space-y-3.5">
                <div className="rounded-xl border border-slate-200 bg-[#fcfcfb] p-4">
                  <p className="text-sm leading-6 text-slate-500">
                    Upload your business documents for verification. Accepted
                    formats: JPG, PNG, PDF (max 5MB each).
                  </p>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      Business Permit
                    </label>
                    <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center">
                      <Upload className="mx-auto h-7 w-7 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">
                        Click to upload or drag & drop
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        JPG, PNG, PDF up to 5MB
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-slate-900">
                      DTI / SEC Registration
                    </label>
                    <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center">
                      <Upload className="mx-auto h-7 w-7 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-500">
                        Click to upload or drag & drop
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        JPG, PNG, PDF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#fcfcfb] p-4">
                  <h3 className="text-base font-serif font-semibold text-slate-900">
                    Terms & Conditions
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    By registering, you agree to Kompra.ph&apos;s Seller
                    Agreement, including commission rates, return policies, and
                    quality standards. Your application will be reviewed within
                    2–3 business days.
                  </p>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-[#2f8f83] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26776d]"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-[13px] text-slate-500">
                <p>
                    Already a seller?{" "}
                    <Link
                    href="/login"
                    className="text-[13px] font-semibold text-[#2f8f83] hover:underline"
                    >
                    Log In
                    </Link>
                </p>

                <p className="mt-1.5">
                    Want to be a supplier?{" "}
                    <Link
                    href="/register/supplier"
                    className="text-[13px] font-semibold text-[#2f8f83] hover:underline"
                    >
                    Register as Supplier
                    </Link>
                </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}