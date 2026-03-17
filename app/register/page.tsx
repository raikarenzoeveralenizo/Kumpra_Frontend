import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#07245e]">Register</h1>
        <p className="mt-2 text-sm text-slate-500">Create your ecommerce account.</p>
        <form className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Full name" />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Email" />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Username" />
          <input type="password" className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Password" />
          <input type="password" className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Confirm Password" />
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input type="checkbox" className="mt-1" /> I agree to the terms and conditions.
          </label>
          <button className="btn-primary w-full">Register</button>
        </form>
        <p className="mt-5 text-sm text-slate-500">
          Already have an account? <Link href="/login" className="font-semibold text-orange-500">Login</Link>
        </p>
      </div>
    </main>
  );
}