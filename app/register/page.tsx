"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User, Phone, Loader2 } from "lucide-react";
import AuthShowcase from "@/components/auth/AuthShowcase";
import OTPModal from "@/components/ui/OTPModal"; // 1. Import the modal

export default function RegisterPage() {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Status States
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Add Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. Handle OTP Verification
  const handleVerifyOTP = async (otp: string) => {
    const response = await fetch("http://localhost:8000/api/verify-email/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (response.ok) {
      router.push("/login?registered=true&verified=true");
    } else {
      throw new Error("Invalid code"); // This triggers the error state inside OTPModal
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side Validation (Keep your existing validation)
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

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          contact_number: contactNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 4. INSTEAD OF REDIRECTING, OPEN THE MODAL
        setIsModalOpen(true);
      } else {
        if (data.email) {
          setError("An account with this email already exists.");
        } else if (data.contact_number) {
          setError("Invalid contact number format.");
        } else {
          setError("Registration failed. Please try again later.");
        }
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check if the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:flex">
      <AuthShowcase />

      {/* 5. ADD THE MODAL COMPONENT HERE */}
      <OTPModal 
        email={email} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onVerify={handleVerifyOTP} 
      />

      <div className="flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 lg:w-1/2 lg:px-10">
        <div className="w-full max-w-sm">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <h2 className="text-2xl font-bold text-[#1e3a8a]">Create Account</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Sign up to start shopping with Kumpra.ph.
            </p>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              {/* ... All your existing input fields ... */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Contact Number</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="09123456789"
                    value={contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 11) setContactNumber(value);
                    }}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      password !== confirmPassword && confirmPassword !== ""
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#2f8f83] focus:ring-[#2f8f83]/25"
                    }`}
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-[#2f8f83] py-2.5 text-sm font-semibold text-white transition hover:bg-[#26776d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#2f8f83] hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}