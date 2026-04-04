"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import type { ApiOutlet } from "@/types/api-outlet";

interface PickupBranchSelectorProps {
  onSelect: (store: ApiOutlet) => void;
  selectedStore: ApiOutlet | null;
}

export default function PickupBranchSelector({
  onSelect,
  selectedStore,
}: PickupBranchSelectorProps) {
  const [stores, setStores] = useState<ApiOutlet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchStores = async () => {
      try {
        const res = await fetch(`${API_URL}/outlets/`);
        if (!res.ok) {
          throw new Error("Failed to fetch outlets");
        }
        const data = await res.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching outlets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="space-y-6">
      {!selectedStore && (
        <>
          <h3 className="text-xl font-serif font-bold text-brand-blue">
            Select Pickup Store
          </h3>

          <div className="grid gap-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading pickup stores...</p>
            ) : stores.length === 0 ? (
              <p className="text-sm text-slate-500">No pickup stores available.</p>
            ) : (
              stores.map((store) => (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => onSelect(store)}
                  className="group flex w-full cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 text-left transition-all hover:border-[#3a9688] hover:bg-[#f8faf9]"
                >
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 group-hover:border-[#3a9688]">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#3a9688] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-brand-blue">{store.name}</p>
                      <p className="text-sm font-medium text-slate-400">
                        {store.address || store.branch_address || "No address available"}
                      </p>
                      <p className="text-sm font-bold text-[#3a9688]">
                        8:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>

                  <MapPin className="h-5 w-5 text-[#3a9688] opacity-80" />
                </button>
              ))
            )}
          </div>
        </>
      )}

      <div className="relative flex h-56 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
        <MapPin className="mb-3 h-8 w-8 text-[#3a9688] opacity-40" />
        <p className="font-serif text-sm font-bold text-slate-400">
          Map for {selectedStore ? selectedStore.name : "pickup location"}
        </p>
        <p className="text-xs text-slate-400">Full map integration coming soon</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Calendar className="h-3 w-3" /> Pickup Date
          </label>
          <input
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm focus:border-[#3a9688] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Clock className="h-3 w-3" /> Pickup Time
          </label>
          <input
            type="time"
            className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm focus:border-[#3a9688] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}