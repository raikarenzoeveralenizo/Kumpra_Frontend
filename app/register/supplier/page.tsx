"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShowcase from "@/components/auth/AuthShowcase";
import {
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  ChevronDown,
  MapPin,
  Upload,
} from "lucide-react";

export default function SupplierRegisterPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:flex">
      <AuthShowcase variant="supplier" />

      <div className="flex min-h-screen w-full items-center justify-center px-3 py-4 sm:px-4 lg:w-1/2 lg:px-6">
        <div className="w-full max-w-115">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-4">
            <h1 className="text-lg font-serif font-bold text-[#0f172a] sm:text-xl">
              Supplier Registration
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              {step === 1 && "Step 1 of 3 — Account Info"}
              {step === 2 && "Step 2 of 3 — Company Details"}
              {step === 3 && "Step 3 of 3 — Documents & Terms"}
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
                    Company / Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your business name"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
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
                      placeholder="company@email.com"
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
                    Business Type *
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20">
                      <option>Select business type</option>
                      <option>Manufacturer</option>
                      <option>Distributor</option>
                      <option>Wholesaler</option>
                      <option>Importer</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Product Categories *
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20">
                      <option>Primary product category</option>
                      <option>Food</option>
                      <option>Beverages</option>
                      <option>Groceries</option>
                      <option>Household Products</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Company Address *
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

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
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
                      Min. Order Value (₱)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 5000"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Delivery Areas
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Metro Manila, Bulacan, Cavite"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">
                    Company Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your company and products..."
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
                  <p className="text-sm text-slate-500">
                    Upload your business documents for verification.
                  </p>

                  <div className="mt-4 space-y-4">
                    <UploadCard
                      title="SEC / DTI Registration Certificate"
                      subtext="JPG, PNG, PDF up to 5MB"
                    />
                    <UploadCard
                      title="BIR Certificate of Registration (Form 2303)"
                      subtext="JPG, PNG, PDF up to 5MB"
                    />
                    <UploadCard
                      title="Product Catalog / Price List (Optional)"
                      subtext="JPG, PNG, PDF, XLSX up to 10MB"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#fcfcfb] p-4">
                  <label className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2f8f83] focus:ring-[#2f8f83]"
                    />
                    <span className="text-xs leading-5 text-slate-500">
                      I agree to Kompra.ph&apos;s Supplier Agreement, including
                      product quality standards, delivery SLAs, payment terms,
                      and return/refund policies. I confirm that all information
                      provided is accurate.
                    </span>
                  </label>
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
                Already a supplier?{" "}
                <Link
                  href="/login"
                  className="text-[13px] font-semibold text-[#2f8f83] hover:underline"
                >
                  Log In
                </Link>
              </p>

              <p className="mt-1.5">
                Want to sell directly?{" "}
                <Link
                  href="/register/store-seller"
                  className="text-[13px] font-semibold text-[#2f8f83] hover:underline"
                >
                  Register as Store Seller
                </Link>
              </p>

              <Link
                href="/"
                className="mt-1.5 inline-block text-[12px] text-slate-500 hover:text-slate-700"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadCard({
  title,
  subtext,
}: {
  title: string;
  subtext: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-900">
        {title}
      </label>

      <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center">
        <Upload className="mx-auto h-8 w-8 text-slate-400" />
        <p className="mt-2 text-sm text-slate-500">
          Click to upload or drag & drop
        </p>
        <p className="mt-1 text-xs text-slate-400">{subtext}</p>
      </div>
    </div>
  );
}