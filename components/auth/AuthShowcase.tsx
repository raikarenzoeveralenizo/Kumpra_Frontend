import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function AuthShowcase() {
  return (
    <div className="relative hidden min-h-screen overflow-hidden lg:flex lg:w-1/2 items-center justify-center bg-[#2f8f83] px-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-md text-center">
        <div className="mx-auto mb-8 inline-flex items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl shadow-lg ring-1 ring-white/30 px-6 py-4 max-w-fit">
            <img
                src="/img/logo.png"
                alt="Kompra.ph"
                className="h-28 w-auto object-contain drop-shadow-md"
            />
            </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">Kompra.ph</h1>
        <p className="mx-auto mb-10 max-w-sm text-base leading-8 text-white/90 sm:text-lg">
          Your one-stop marketplace for fresh, local products delivered right to your doorstep.
        </p>

        <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-8 text-center">
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="mt-1 text-sm text-white/80">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50+</p>
            <p className="mt-1 text-sm text-white/80">Stores</p>
          </div>
          <div>
            <p className="text-3xl font-bold">10K+</p>
            <p className="mt-1 text-sm text-white/80">Users</p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-sm text-white/90 underline-offset-4 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}