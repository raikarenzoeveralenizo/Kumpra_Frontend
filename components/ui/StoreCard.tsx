"use client"; // <--- Add this at the very top

import Link from "next/link";
import { Store } from "@/types/store";
import { MapPin } from "lucide-react";

export default function StoreCard({ store }: { store: Store }) {
  return (
    <Link 
      href={`/store/${store.slug}`} 
      className="group block rounded-[2rem] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* THE IMAGE: Now onError will work correctly */}
      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
        <img
          src={store.banner}
          alt={store.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // This logic requires "use client"
            (e.target as HTMLImageElement).src = "/img/fashion.jpg"; 
          }}
        />
      </div>

      <div className="px-1 pb-2">
        <h3 className="text-xl font-bold text-[#07245e] transition-colors">
          {store.name}
        </h3>
        
        <p className="mt-1 text-sm font-medium text-emerald-600">
          {store.branchName}
        </p>

        <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <MapPin className="h-3 w-3" />
          </div>
          <span className="line-clamp-1">{store.address}</span>
        </div>
      </div>
    </Link>
  );
}