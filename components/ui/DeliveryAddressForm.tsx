"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, CheckCircle2, Pencil, Trash2, Loader2 } from "lucide-react";
import AddressModal from "./AddressModal";

const MapView = dynamic(() => import("@/components/ui/Map"), { ssr: false });

type AddressItem = {
  id: number;
  label: string;
  full_name: string;
  phone: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  street_address: string;
  postal_code: string;
  lat: number;
  lng: number;
  is_default: boolean;
};

export default function DeliveryAddressForm() {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8000/api/addresses/";

  const getFreshToken = () => typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = getFreshToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAddresses(data);
          const defaultAddr = data.find((a: AddressItem) => a.is_default);
          if (defaultAddr) setSelectedId(defaultAddr.id);
          else if (data.length > 0) setSelectedId(data[0].id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressSubmit = async (formData: any) => {
    const token = getFreshToken();
    const payload = {
      full_name: formData.fullName,
      phone: formData.phone,
      region: formData.region.name,
      province: formData.province.name,
      city: formData.city.name,
      barangay: formData.barangay.name,
      street_address: formData.street,
      postal_code: formData.postalCode,
      label: formData.label,
      is_default: formData.isDefault,
      lat: formData.lat,
      lng: formData.lng,
    };

    const url = editingAddress ? `${API_URL}${editingAddress.id}/` : API_URL;
    const method = editingAddress ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const refreshRes = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedList = await refreshRes.json();
        setAddresses(updatedList);
        setIsModalOpen(false);
        setEditingAddress(null);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const token = getFreshToken();
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setAddresses(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const selectedAddress = addresses.find((a) => a.id === selectedId);

  // Helper to check if coordinates are valid
  const hasValidCoords = selectedAddress && 
                         !isNaN(Number(selectedAddress.lat)) && 
                         !isNaN(Number(selectedAddress.lng));

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-blue" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-xl font-bold tracking-tight text-brand-blue">Delivery Address</h3>
        <button
          onClick={() => { setEditingAddress(null); setIsModalOpen(true); }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-[#de922f] hover:text-white"
        >
          <Plus className="h-4 w-4" /> Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <p className="text-slate-500">No saved addresses found.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedId(addr.id)}
                className={`flex items-start gap-4 rounded-2xl border p-5 transition-all cursor-pointer ${
                  selectedId === addr.id ? "border-[#3a9688] bg-[#f8faf9]" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase">{addr.label}</span>
                    <p className="font-semibold text-brand-blue">{addr.full_name}</p>
                  </div>
                  <p className="text-sm text-slate-600">{addr.street_address}, {addr.barangay}, {addr.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setEditingAddress(addr); setIsModalOpen(true); }} className="p-2 hover:text-[#de922f]"><Pencil size={16}/></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }} className="p-2 hover:text-red-500"><Trash2 size={16}/></button>
                  {selectedId === addr.id && <CheckCircle2 className="text-[#3a9688]" size={20} />}
                </div>
              </div>
            ))}
          </div>

          {/* CRITICAL FIX: Only render MapView if we have valid coordinates */}
          <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
             {hasValidCoords ? (
                <MapView 
                  lat={Number(selectedAddress.lat)} 
                  lng={Number(selectedAddress.lng)} 
                  label={selectedAddress.label} 
                />
             ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                  Select an address to view location
                </div>
             )}
          </div>
        </>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddressSubmit}
        initialData={editingAddress}
      />
    </div>
  );
}