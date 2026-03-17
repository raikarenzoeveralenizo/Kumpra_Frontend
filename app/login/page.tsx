import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#07245e]">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to continue shopping.</p>
        <form className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Email or Username" />
          <input type="password" className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Password" />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" /> Remember me
          </label>
          <button className="btn-primary w-full">Login</button>
        </form>
        <p className="mt-5 text-sm text-slate-500">
          No account yet? <Link href="/register" className="font-semibold text-orange-500">Register</Link>
        </p>
      </div>
    </main>
  );
}