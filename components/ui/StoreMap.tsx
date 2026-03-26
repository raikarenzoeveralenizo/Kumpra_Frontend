"use client";

import dynamic from "next/dynamic";

// safely load the map logic only on the client side
const MapView = dynamic(() => import("@/components/ui/Map"), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full space-y-2 text-slate-400">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
      <p className="text-sm font-medium">Loading Map...</p>
    </div>
  )
});

interface StoreMapProps {
  lat: number;
  lng: number;
  label: string;
}

export default function StoreMap({ lat, lng, label }: StoreMapProps) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 p-1 shadow-sm transition-all hover:shadow-md">
      {/* Map Header Info (Optional - matches the Lat/Lng text in your image) */}
      <div className="absolute bottom-4 left-1/2 z-1000 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur-sm border border-slate-100">
        Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
      </div>

      <div className="h-64 w-full rounded-xl overflow-hidden">
        <MapView lat={lat} lng={lng} label={label} />
      </div>
    </div>
  );
}