"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Load the Map component from your UI folder
// ssr: false is CRITICAL for Leaflet in Next.js
const MapView = dynamic(() => import("@/components/ui/Map"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-100 animate-pulse text-slate-400">
      Loading Map...
    </div>
  )
});

const STORE_LOCATION = { lat: 10.3157, lng: 123.8854 }; // Cebu Main

export default function DeliveryAddressForm() {
  const [userCoords, setUserCoords] = useState(STORE_LOCATION);
  const [address, setAddress] = useState("");

  // Get User's Current Location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, (error) => {
          console.warn("Location access denied, using default.");
      });
    }
  }, []);

  return (
    <div className="card space-y-4 p-5 shadow-lg border rounded-2xl bg-white">
      <h3 className="text-lg font-bold text-[#07245e]">Delivery Address</h3>
      
      <input 
        className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" 
        placeholder="Full address (Street, House No., Barangay)" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 ml-2">Latitude</label>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-500" value={userCoords.lat.toFixed(6)} readOnly />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400 ml-2">Longitude</label>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-500" value={userCoords.lng.toFixed(6)} readOnly />
        </div>
      </div>

      {/* THE LIVE FREE MAP */}
      <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-300 z-0">
        <MapView 
            lat={userCoords.lat} 
            lng={userCoords.lng} 
            label="Your Delivery Location" 
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs text-slate-500 uppercase font-bold">Nearest Store</p>
          <p className="mt-1 font-semibold text-[#07245e]">OrangeMart - Cebu Main</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs text-slate-500 uppercase font-bold">Delivery Fee</p>
          <p className="mt-1 font-semibold text-orange-500">₱49</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs text-slate-500 uppercase font-bold">Est. Time</p>
          <p className="mt-1 font-semibold text-[#07245e]">35-45 mins</p>
        </div>
      </div>
    </div>
  );
}