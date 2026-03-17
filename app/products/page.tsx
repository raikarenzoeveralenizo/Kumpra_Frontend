"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { products } from "@/data/products";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50);

  const categories = ["All", "Fruits & Vegetables", "Bakery", "Beverages", "Dairy & Eggs", "Meat & Seafood", "Pantry"];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="container-shell py-8">
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-6">Products</h1>

        {/* Search and Filter Toggle Row */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input 
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 focus:border-[#3a9688] focus:outline-none focus:ring-1 focus:ring-[#3a9688]" 
              placeholder="Search products..." 
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold transition-colors ${
              showFilters ? "bg-[#3a9688] text-white" : "bg-[#3a9688] text-white hover:opacity-90"
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Category Pills Row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat 
                ? "bg-[#3a9688] border-[#3a9688] text-white" 
                : "bg-white border-slate-200 text-slate-600 hover:border-[#3a9688]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="mb-8 grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-4">
            {/* Sort By */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort By</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Store Location */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Location</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none">
                <option>All Stores</option>
                <option>Downtown Fresh Market</option>
                <option>Uptown Organic Hub</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <div className="mb-2 flex justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {/* Use the state variable here */}
                    Price: ₱0 — ₱{maxPrice}
                  </label>
                </div>
                <input 
                  type="range" 
                  min="0"
                  max="1000" // Set this to your actual maximum product price
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#3a9688] accent-[#3a9688]" 
                />
            </div>

            {/* Min Rating */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Min Rating: Any</label>
              <div className="flex gap-1">
                {["Any", "3★+", "3.5★+", "4★+", "4.5★+"].map((r) => (
                  <button key={r} className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold hover:border-[#3a9688] hover:text-[#3a9688]">
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <ProductGrid items={products} />
      </section>
      <Footer />
    </main>
  );
}