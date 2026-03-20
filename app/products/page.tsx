"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { products } from "@/data/products";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  // 1. State Management for Filters
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price

  const categories = ["All", "Fruits & Vegetables", "Bakery", "Beverages", "Dairy & Eggs", "Meat & Seafood", "Pantry"];

  // 2. Logic to Filter Products in Real-Time
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.categoryId === activeCategory;
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/25 focus:outline-none" 
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

        {/* Category Pills Row */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "border-[#3a9688] bg-[#3a9688] text-white shadow-sm"
                  : cat === "All"
                  ? "border-slate-200 bg-white text-slate-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#de922f] hover:bg-[#de922f] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="mb-8 grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Sort By */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort By</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Store Location */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Location</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option>All Stores</option>
                <option>Downtown Fresh Market</option>
                <option>Uptown Organic Hub</option>
              </select>
            </div>

            {/* Dynamic Price Range */}
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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

            {/* Min Rating */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">Min Rating</label>
              <div className="flex gap-1">
                {["Any", "3★+", "4★+", "4.5★+"].map((r) => (
                  <button key={r} className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold hover:border-[#3a9688] hover:text-[#3a9688] transition-colors">
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Product Display Area */}
        {filteredProducts.length > 0 ? (
          <ProductGrid items={filteredProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-slate-900">No products found</p>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All"); setMaxPrice(1000);}}
              className="mt-4 text-[#3a9688] font-bold hover:underline"
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