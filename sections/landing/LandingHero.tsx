import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="bg-gradient-to-br from-[#07245e] to-blue-900 py-20 text-white">
      <div className="container-shell grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Multi-Store Ecommerce</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
            Browse, shop, and choose Delivery or Pickup.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Discover store-based products, search by category, view branch locations, and place orders with a clean delivery and pickup flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login" className="btn-primary">Login</Link>
            <Link href="/register" className="rounded-xl border border-white px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-[#07245e]">Register</Link>
            <Link href="/home" className="rounded-xl bg-white px-5 py-3 font-semibold text-[#07245e]">Start Shopping</Link>
          </div>
        </div>
        <div className="card bg-white/10 p-8 text-white backdrop-blur">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="mt-2 text-sm text-white/80">Nearest branch matching and distance-based fee preview.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-bold">Pickup Option</h3>
              <p className="mt-2 text-sm text-white/80">Choose store branch and pickup schedule.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-bold">Store-Based Products</h3>
              <p className="mt-2 text-sm text-white/80">Every product is connected to a store or branch.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="font-bold">Live Order Flow</h3>
              <p className="mt-2 text-sm text-white/80">Preparing, rider assigned, and on-delivery tracking UI.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}