"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/useCart";
import { useAnimationStore } from "@/store/useAnimationStore";
import type {
  ApiBranch,
  ApiOrganization,
  ApiOutlet,
} from "@/types/api-organization";
import type { ApiProduct } from "@/types/api-product";

type LocationItem = {
  id: number;
  name: string;
  type: "branch" | "outlet";
  address?: string | null;
  phone?: string | null;
  branchName?: string | null;
};

export default function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const setCount = useCart((state) => state.setCount);
  const triggerFlyToCart = useAnimationStore((state) => state.triggerFlyToCart);

  const [organization, setOrganization] = useState<ApiOrganization | null>(null);
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeView, setActiveView] = useState<"locations" | "products">(
    "locations"
  );
  const [filter, setFilter] = useState<"all" | "branch" | "outlet">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL is missing");
        }

        const [organizationRes, productsRes] = await Promise.all([
          fetch(`${API_URL}/organizations/${id}/`, { cache: "no-store" }),
          fetch(`${API_URL}/products/`, { cache: "no-store" }),
        ]);

        if (!organizationRes.ok) {
          const text = await organizationRes.text();
          throw new Error(
            `Failed to fetch organization. ${organizationRes.status} ${text}`
          );
        }

        if (!productsRes.ok) {
          const text = await productsRes.text();
          throw new Error(
            `Failed to fetch products. ${productsRes.status} ${text}`
          );
        }

        const organizationData = await organizationRes.json();
        const productsData = await productsRes.json();

        setOrganization(organizationData);
        setAllProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to load organization"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const locations = useMemo(() => {
    if (!organization?.branches) return [];

    const items: LocationItem[] = [];

    organization.branches.forEach((branch: ApiBranch) => {
      items.push({
        id: branch.id,
        name: branch.name,
        type: "branch",
        address: branch.address,
        phone: branch.phone,
      });

      (branch.outlets || []).forEach((outlet: ApiOutlet) => {
        items.push({
          id: outlet.id,
          name: outlet.name,
          type: "outlet",
          address: outlet.address,
          phone: outlet.phone,
          branchName: branch.name,
        });
      });
    });

    return items;
  }, [organization]);

  const organizationOutletIds = useMemo(() => {
    const ids = new Set<number>();

    if (!organization?.branches) return ids;

    organization.branches.forEach((branch: ApiBranch) => {
      (branch.outlets || []).forEach((outlet: ApiOutlet) => {
        ids.add(outlet.id);
      });
    });

    return ids;
  }, [organization]);

  const organizationProducts = useMemo(() => {
    return allProducts.filter((product) =>
      organizationOutletIds.has(product.outlet_id)
    );
  }, [allProducts, organizationOutletIds]);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredLocations = useMemo(() => {
    return locations.filter((item) => {
      const matchesType = filter === "all" ? true : item.type === filter;

      const matchesSearch =
        normalizedSearch === ""
          ? true
          : item.name.toLowerCase().includes(normalizedSearch) ||
            (item.address || "").toLowerCase().includes(normalizedSearch) ||
            (item.phone || "").toLowerCase().includes(normalizedSearch) ||
            (item.branchName || "").toLowerCase().includes(normalizedSearch) ||
            item.type.toLowerCase().includes(normalizedSearch);

      return matchesType && matchesSearch;
    });
  }, [locations, filter, normalizedSearch]);

  const filteredProducts = useMemo(() => {
    return organizationProducts.filter((product) => {
      if (normalizedSearch === "") return true;

      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description || "").toLowerCase().includes(normalizedSearch) ||
        ((product as any).category_name || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.outlet_name.toLowerCase().includes(normalizedSearch) ||
        (product.branch_name || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [organizationProducts, normalizedSearch]);

  const branchCount = organization?.total_branches ?? 0;
  const outletCount = organization?.total_outlets ?? 0;

  const getImageUrl = (image?: string | null) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_BASE_URL = API_URL?.replace("/api", "") || "";

    if (!image) return "/img/placeholder.jpg";
    if (image.startsWith("http")) return image;

    return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  };

  const handleAddToCart = async (
    e: React.MouseEvent,
    product: ApiProduct
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("access");

    if (!token) {
      localStorage.setItem(
        "redirect_after_login",
        `/product/${product.inventory_item_id}`
      );
      router.push("/login");
      return;
    }

    try {
      setAddingProductId(product.inventory_item_id);

      const btn = buttonRefs.current[product.inventory_item_id];
      if (btn) {
        const rect = btn.getBoundingClientRect();
        triggerFlyToCart(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      const res = await fetch(`${API_URL}/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.inventory_item_id,
          quantity: 1,
          branch_id: product.outlet_id ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add to cart.");
      }

      const totalCount = Array.isArray(data.items)
        ? data.items.reduce(
            (sum: number, item: { quantity: number }) =>
              sum + Number(item.quantity || 0),
            0
          )
        : 0;

      setCount(totalCount);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error instanceof Error ? error.message : "Failed to add to cart.");
    } finally {
      setAddingProductId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-[#f7f7f5]">
        <Header />
        <section className="flex-1 flex items-center justify-center">
          <p className="text-slate-500 text-lg">Loading organization...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col bg-[#f7f7f5]">
        <Header />
        <section className="flex-1 flex items-center justify-center">
          <p className="font-semibold text-red-500">{error}</p>
        </section>
        <Footer />
      </main>
    );
  }

  if (!organization) {
    return (
      <main className="min-h-screen flex flex-col bg-[#f7f7f5]">
        <Header />
        <section className="flex-1 flex items-center justify-center">
          <p className="font-semibold text-red-500">Organization not found.</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f7f7f5]">
      <Header />

      <section className="flex-1 container-shell px-4 py-8 pb-20 md:px-0">
        <>
          <Link
            href="/stores"
            className="mb-6 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← All Organizations
          </Link>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-37.5 w-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center md:h-55">
              <div className="h-full w-full bg-white/60" />
            </div>

            <div className="relative -mt-10 px-5 pb-6 md:-mt-14 md:px-8 md:pb-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl font-bold text-brand-blue shadow md:h-20 md:w-20">
                  {organization.name?.charAt(0)}
                </div>

                <div className="pt-1 md:pt-2">
                  <h1 className="font-serif text-2xl font-bold text-slate-900 md:text-4xl">
                    {organization.name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                    Explore locations and products under this organization.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="rounded-full bg-[#f3eee7] px-3 py-1">
                      {branchCount} Branches
                    </span>
                    <span className="rounded-full bg-[#f3eee7] px-3 py-1">
                      {outletCount} Outlets
                    </span>
                    <span className="rounded-full bg-[#f3eee7] px-3 py-1">
                      {organizationProducts.length} Products
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, branches, outlets..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm focus:border-[#2f8f83] focus:outline-none focus:ring-2 focus:ring-[#2f8f83]/25"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveView("locations")}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  activeView === "locations"
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                Locations
              </button>

              <button
                onClick={() => setActiveView("products")}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  activeView === "products"
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                All Products ({organizationProducts.length})
              </button>
            </div>

            {activeView === "locations" && (
              <div className="mt-7 flex flex-wrap gap-3">
                {(["all", "branch", "outlet"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                      filter === item
                        ? "bg-[#1f9d8b] text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {item === "all"
                      ? `All (${locations.length})`
                      : item === "branch"
                      ? `Branches (${branchCount})`
                      : `Outlets (${outletCount})`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeView === "locations" ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredLocations.map((location) => (
                <Link
                  key={`${location.type}-${location.id}`}
                  href={`/store/locations/${location.id}?type=${location.type}&org=${id}`}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="relative h-40 w-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center md:h-56">
                      <span className="absolute right-3 top-3 rounded-full bg-[#e8d7bf] px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                        {location.type}
                      </span>
                    </div>

                    <div className="p-5">
                      <h2 className="font-serif text-xl font-bold text-slate-900 md:text-2xl">
                        {location.name}
                      </h2>

                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{location.address || "No address available"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>8:00 AM - 9:00 PM</span>
                        </div>
                        {location.branchName && (
                          <div className="text-xs text-slate-500">
                            Branch: {location.branchName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const isAdding = addingProductId === product.inventory_item_id;

                return (
                  <Link
                    key={product.inventory_item_id}
                    href={`/product/${product.inventory_item_id}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-square overflow-hidden bg-[#f8fafc]">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3.5">
                      <h3 className="text-[15px] font-semibold text-[#2f8f83]">
                        {product.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {product.description || "No description"}
                      </p>

                      <p className="mt-2 text-lg font-bold text-slate-900">
                        ₱{Number(product.price).toFixed(2)}
                      </p>

                      <p className="text-xs text-slate-400">
                        Stock: {product.quantity}
                      </p>

                      <div
                        className="mt-3 flex justify-end"
                        ref={(el) => {
                          buttonRefs.current[product.inventory_item_id] =
                            el as unknown as HTMLButtonElement | null;
                        }}
                      >
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={isAdding}
                          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                            isAdding
                              ? "cursor-not-allowed opacity-60 bg-[#2f8f83] text-white"
                              : "bg-white text-slate-500 hover:bg-[#de922f] hover:text-white"
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {activeView === "locations" && filteredLocations.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No matching locations found.
            </div>
          )}

          {activeView === "products" && filteredProducts.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No matching products found.
            </div>
          )}
        </>
      </section>

      <Footer />
    </main>
  );
}