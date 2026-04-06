"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock } from "lucide-react";
import type { ApiBranch, ApiOrganization, ApiOutlet } from "@/types/api-organization";

type LocationItem = {
  id: number;
  name: string;
  type: "branch" | "outlet";
  address?: string | null;
  phone?: string | null;
};

export default function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [organization, setOrganization] = useState<ApiOrganization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "branch" | "outlet">("all");

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${API_URL}/organizations/${id}/`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch organization. ${res.status} ${text}`);
        }
        return res.json();
      })
      .then((data) => setOrganization(data))
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load organization");
      })
      .finally(() => setLoading(false));
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
        });
      });
    });

    return items;
  }, [organization]);

  const filteredLocations = locations.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  const branchCount = organization?.total_branches ?? 0;
  const outletCount = organization?.total_outlets ?? 0;

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="container-shell px-4 py-8 pb-20 md:px-0">
        {loading ? (
          <p className="text-slate-500">Loading organization...</p>
        ) : error ? (
          <p className="font-semibold text-red-500">{error}</p>
        ) : !organization ? (
          <p className="font-semibold text-red-500">Organization not found.</p>
        ) : (
          <>
            <Link
              href="/stores"
              className="mb-6 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← All Organizations
            </Link>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-[150px] w-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center md:h-[220px]">
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
                      Browse branches and outlets under this organization.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                      <span className="rounded-full bg-[#f3eee7] px-3 py-1">
                        {branchCount} Branches
                      </span>
                      <span className="rounded-full bg-[#f3eee7] px-3 py-1">
                        {outletCount} Outlets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {(["all", "branch", "outlet"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
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

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredLocations.map((location) => (
                <Link
                  key={`${location.type}-${location.id}`}
                  href={`/store/locations/${location.id}?type=${location.type}`}
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
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}