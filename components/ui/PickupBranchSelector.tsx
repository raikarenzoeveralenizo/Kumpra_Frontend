"use client";

import { stores } from "@/data/stores";
import { MapPin, Clock, Calendar } from "lucide-react";

interface PickupBranchSelectorProps {
  onSelect: (store: any) => void;
  selectedStore: any | null;
}

export default function PickupBranchSelector({ onSelect, selectedStore }: PickupBranchSelectorProps) {
  return (
    <div className="space-y-6">
      {/* This entire section (Title + Cards) disappears after selection */}
      {!selectedStore && (
        <>
          <h3 className="text-xl font-serif font-bold text-[#07245e]">
            Select Pickup Store
          </h3>

          <div className="grid gap-3">
            {stores.map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => onSelect(store)}
                className="group flex w-full cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:border-[#3a9688] hover:bg-[#f8faf9] text-left"
              >
                <div className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 group-hover:border-[#3a9688]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3a9688] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#07245e]">{store.name}</p>
                    <p className="text-sm text-slate-400 font-medium">{store.address}</p>
                    <p className="text-sm text-[#3a9688] font-bold">
                      {store.openingHours || "8:00 AM - 9:00 PM"}
                    </p>
                  </div>
                </div>
                <MapPin className="h-5 w-5 text-[#3a9688] opacity-80" />
              </button>
            ))}
          </div>
        </>
      )}

      {/* MAP: Always stays visible */}
      <div className="relative flex h-56 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center">
        <MapPin className="mb-3 h-8 w-8 text-[#3a9688] opacity-40" />
        <p className="font-serif text-sm font-bold text-slate-400">
          Map for {selectedStore ? selectedStore.name : "pickup location"}
        </p>
        <p className="text-xs text-slate-400">Full map integration coming soon</p>
      </div>

      {/* DATE & TIME: Always stay visible */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Calendar className="h-3 w-3" /> Pickup Date
          </label>
          <input
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]} 
            className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm focus:border-[#3a9688] focus:outline-none shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Clock className="h-3 w-3" /> Pickup Time
          </label>
          <input
            type="time"
            className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm focus:border-[#3a9688] focus:outline-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}