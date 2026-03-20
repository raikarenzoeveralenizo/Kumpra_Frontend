"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, CheckCircle2 } from "lucide-react";
import AddressModal from "./AddressModal"; // Import your new modal

const MapView = dynamic(() => import("@/components/ui/Map"), { ssr: false });

export default function DeliveryAddressForm() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", name: "John Doe", phone: "09123456789", fullAddress: "123 Colon Street, Cebu City", lat: 10.3157, lng: 123.8854 },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedAddress = addresses.find(a => a.id === selectedId);

  const handleAddNewAddress = (formData: any) => {
    const newEntry = {
      id: Date.now(),
      label: formData.label,
      name: formData.fullName,
      phone: formData.phone,
      fullAddress: `${formData.street}, ${formData.region}`,
      lat: 10.3157, // You can update this with actual geocoding later
      lng: 123.8854
    };
    setAddresses([...addresses, newEntry]);
    setSelectedId(newEntry.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-serif font-bold text-brand-blue">Delivery Address</h3>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="text-sm font-bold text-[#3a9688] flex items-center gap-1 hover:underline"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="grid gap-3">
        {addresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setSelectedId(addr.id)}
            className={`flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
              selectedId === addr.id ? "border-[#3a9688] bg-[#f8faf9]" : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">{addr.label}</span>
                <p className="font-bold text-brand-blue">{addr.name}</p>
              </div>
              <p className="text-sm text-slate-500">{addr.fullAddress}</p>
            </div>
            {selectedId === addr.id && <CheckCircle2 className="h-5 w-5 text-[#3a9688]" />}
          </button>
        ))}
      </div>

      <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-200">
        <MapView lat={selectedAddress?.lat || 10.3157} lng={selectedAddress?.lng || 123.8854} label="Delivery Location" />
      </div>

      {/* RENDER MODAL SEPARATELY */}
      <AddressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddNewAddress} 
      />
    </div>
  );
}