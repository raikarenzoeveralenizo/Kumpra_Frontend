"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !contactNumber || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (contactNumber.length !== 11) {
      setError("Contact number must be exactly 11 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ fullName, email, contactNumber, password })
    );

    setError("");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:flex">
      <AuthShowcase />

      <div className="flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 lg:w-1/2 lg:px-10">
        <div className="w-full max-w-sm">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <h2 className="text-2xl font-bold text-brand-blue">Create Account</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Sign up to start shopping with Kompra.ph.
            </p>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">

              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="09XXXXXXXXX"
                    value={contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // numbers only
                      if (value.length <= 11) {
                        setContactNumber(value);
                      }
                    }}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                    }`}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      error
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                    }`}
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#2f8f83] py-2.5 text-sm font-semibold text-white transition hover:bg-[#26776d]"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#2f8f83] hover:underline">
                Log In
              </Link>
            </p>

            <Link
              href="/"
              className="mt-4 block text-center text-sm text-slate-500 hover:text-slate-700 lg:hidden"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}