"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type SearchProduct = {
  inventory_item_id: number;
  product_id: number;
  name: string;
  image?: string | null;
  description?: string | null;
  category_name?: string | null;
  price: number;
  quantity: number;
  outlet_id: number;
  outlet_name: string;
};

type SearchStore = {
  id: number;
  name: string;
  address?: string | null;
  phone?: string | null;
};

type SearchCategory = {
  id: number;
  name: string;
  description?: string | null;
};

type SearchOrganization = {
  id: number;
  name: string;
};

type SearchBranch = {
  id: number;
  name: string;
  address?: string | null;
  phone?: string | null;
};

type SearchResponse = {
  products: SearchProduct[];
  stores: SearchStore[];
  categories: SearchCategory[];
  organizations: SearchOrganization[];
  branches: SearchBranch[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResponse>({
    products: [],
    stores: [],
    categories: [],
    organizations: [],
    branches: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_BASE_URL = API_URL?.replace("/api", "") || "";

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is missing");
        }

        if (!query.trim()) {
          setResults({
            products: [],
            stores: [],
            categories: [],
            organizations: [],
            branches: [],
          });
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${API_URL}/search/?q=${encodeURIComponent(query.trim())}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("SEARCH ERROR RESPONSE:", errorText);
          throw new Error(`Failed to fetch search results. Status: ${res.status}`);
        }

        const data: SearchResponse = await res.json();

        setResults({
          products: Array.isArray(data.products) ? data.products : [],
          stores: Array.isArray(data.stores) ? data.stores : [],
          categories: Array.isArray(data.categories) ? data.categories : [],
          organizations: Array.isArray(data.organizations) ? data.organizations : [],
          branches: Array.isArray(data.branches) ? data.branches : [],
        });
      } catch (err) {
        console.error("LOAD SEARCH ERROR:", err);
        setError(err instanceof Error ? err.message : "Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [API_URL, query]);

  const getImageUrl = (image: string | null | undefined) => {
    if (!image) return "/img/placeholder.jpg";
    if (image.startsWith("http")) return image;
    return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  };

  const totalResults =
    results.products.length +
    results.stores.length +
    results.categories.length +
    results.organizations.length +
    results.branches.length;

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="container-shell py-8">
        <h1 className="text-3xl font-bold text-slate-900">Search Results</h1>
        <p className="mt-2 text-slate-600">
          Showing results for: <span className="font-semibold">"{query}"</span>
        </p>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading results...</div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-red-600">Failed to load search results</p>
            <p className="mt-2 text-slate-500">{error}</p>
          </div>
        ) : !query.trim() ? (
          <div className="py-20 text-center text-slate-500">
            Type something in the search bar to see results.
          </div>
        ) : totalResults === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-slate-900">No results found</p>
            <p className="mt-2 text-slate-500">Try another keyword.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {results.products.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Products</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.products.map((product) => (
                    <Link
                      key={product.inventory_item_id}
                      href={`/product/${product.inventory_item_id}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="aspect-square overflow-hidden bg-slate-100">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {product.category_name || "Uncategorized"}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[#2f8f83]">
                          ₱{Number(product.price).toFixed(2)}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Store: {product.outlet_name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.stores.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Stores</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.stores.map((store) => (
                    <Link
                      key={store.id}
                      href={`/store/${store.id}`}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <h3 className="font-semibold text-slate-900">{store.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {store.address || "No address available"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.categories.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Categories</h2>
                <div className="flex flex-wrap gap-3">
                  {results.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.organizations.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Organizations</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.organizations.map((org) => (
                    <div
                      key={org.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <h3 className="font-semibold text-slate-900">{org.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.branches.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Branches</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <h3 className="font-semibold text-slate-900">{branch.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {branch.address || "No address available"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}