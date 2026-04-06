"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { Search, SlidersHorizontal } from "lucide-react";
import type { ApiProduct } from "@/types/api-product";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is missing");
        }

        console.log("API_URL:", API_URL);
        console.log("FETCHING:", `${API_URL}/products/`);

        const res = await fetch(`${API_URL}/products/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        console.log("PRODUCTS STATUS:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("PRODUCTS ERROR RESPONSE:", errorText);
          throw new Error(`Failed to fetch products. Status: ${res.status}`);
        }

        const data: ApiProduct[] = await res.json();
        console.log("PRODUCTS API DATA:", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("LOAD PRODUCTS ERROR:", err);
        setProducts([]);
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPrice = Number(product.price) <= maxPrice;

    return matchesSearch && matchesPrice;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="container-shell py-8">
        <h1 className="mb-6 font-serif text-3xl font-bold text-slate-900">
          Products
        </h1>

        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 focus:border-[#2f8f83] focus:outline-none focus:ring-2 focus:ring-[#2f8f83]/25"
              placeholder="Search products..."
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl bg-[#3a9688] px-6 py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mb-8 grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-4">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Price: ₱0 — ₱{maxPrice}
                </label>
              </div>

              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#3a9688] accent-[#3a9688]"
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <p className="text-lg font-medium text-red-600">
              Failed to load products
            </p>
            <p className="mt-2 text-slate-500">{error}</p>
            <p className="mt-2 text-sm text-slate-400">
              Check your backend server, API URL, and Django console.
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid items={filteredProducts} />
        ) : (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <p className="text-lg font-medium text-slate-900">
              No products found
            </p>
            <p className="text-slate-500">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setMaxPrice(1000);
              }}
              className="mt-4 font-bold text-[#3a9688] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}