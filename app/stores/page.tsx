"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreCard from "@/components/ui/StoreCard";
import type { ApiOutlet } from "@/types/api-outlet";

export default function AllStoresPage() {
  const [stores, setStores] = useState<ApiOutlet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API_URL}/outlets/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch outlets");
        }
        return res.json();
      })
      .then((data) => setStores(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <Header />

      <section className="container-shell flex-1 py-12 pb-32">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-slate-900">Our Stores</h1>
          <p className="mt-2 text-slate-500">
            Find a store near you for pickup or browse their products.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading stores...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}