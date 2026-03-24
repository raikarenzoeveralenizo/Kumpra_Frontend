"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, CheckCircle2, MapPin, Pencil, Trash2 } from "lucide-react";
import AddressModal from "./AddressModal";

type DeliveryAddressFormProps = {
  selectedAddress?: AddressItem | null;
  onSelectAddress?: (address: AddressItem | null) => void;
};

const MapView = dynamic(() => import("@/components/ui/Map"), { ssr: false });

type AddressItem = {
  id: number;
  label: string;
  name: string;
  phone: string;
  fullAddress: string;
  lat: number;
  lng: number;
};

const STORAGE_KEY = "delivery_addresses";

export default function DeliveryAddressForm({
  selectedAddress: parentSelectedAddress,
  onSelectAddress,
}: DeliveryAddressFormProps) {

  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed: AddressItem[] = JSON.parse(saved);
      setAddresses(parsed);

      if (parsed.length > 0) {
        const initialAddress = parentSelectedAddress || parsed[0];
        setSelectedId(initialAddress.id);
        onSelectAddress?.(initialAddress);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const selectedAddress = addresses.find((a) => a.id === selectedId);

  const handleAddNewAddress = (formData: any) => {
    if (editingAddress) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id
          ? {
              ...addr,
              label: formData.label,
              name: formData.fullName,
              phone: formData.phone,
              fullAddress: `${formData.street}, ${formData.region}`,
              lat: addr.lat ?? 10.3157,
              lng: addr.lng ?? 123.8854,
            }
          : addr
      );

      setAddresses(updatedAddresses);
      
      const updatedAddress =
        updatedAddresses.find((addr) => addr.id === editingAddress.id) || null;
      onSelectAddress?.(updatedAddress);
      setEditingAddress(null);
      setIsModalOpen(false);
      return;
    }

    const newEntry: AddressItem = {
      id: Date.now(),
      label: formData.label,
      name: formData.fullName,
      phone: formData.phone,
      fullAddress: `${formData.street}, ${formData.region}`,
      lat: 10.3157,
      lng: 123.8854,
    };

    const updatedAddresses = [...addresses, newEntry];
    setAddresses(updatedAddresses);
    onSelectAddress?.(newEntry);
    setIsModalOpen(false);
  };

  const handleEditAddress = (addr: AddressItem) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (id: number) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);

    if (selectedId === id) {
      const nextAddress = updatedAddresses.length > 0 ? updatedAddresses[0] : null;
      setSelectedId(nextAddress ? nextAddress.id : null);
      onSelectAddress?.(nextAddress);
    }
  };

  return (
  <div className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-serif text-xl font-bold tracking-tight text-brand-blue">
        Delivery Address
      </h3>

      <button
        onClick={() => {
          setEditingAddress(null);
          setIsModalOpen(true);
        }}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-[#de922f] hover:text-white"
      >
        <Plus className="h-4 w-4" />
        Add Address
      </button>
    </div>

    {addresses.length === 0 ? (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-slate-500">
            <MapPin className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <h4 className="text-lg font-semibold tracking-tight text-slate-600">
            No saved addresses
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Add an address to continue with delivery
          </p>

          <button
            onClick={() => {
              setEditingAddress(null);
              setIsModalOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-[#de922f] hover:text-white"
          >
            <Plus className="h-4 w-4" />
            Add Your First Address
          </button>
        </div>
      </div>
    
      ) : (
        <>
          <div className="grid gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => {
                  setSelectedId(addr.id);
                  onSelectAddress?.(addr);
                }}
                className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                  selectedId === addr.id
                    ? "border-[#3a9688] bg-[#f8faf9] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {addr.label}
                    </span>
                    <p className="font-semibold text-brand-blue">{addr.name}</p>
                    <p className="text-sm text-slate-400">{addr.phone}</p>
                  </div>

                  <p className="leading-relaxed text-slate-600">
                    {addr.fullAddress}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(addr);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#de922f] hover:bg-[#de922f] hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(addr.id);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-500 transition-all duration-200 hover:bg-[#de922f] hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {selectedId === addr.id && (
                    <CheckCircle2 className="mt-2 h-5 w-5 shrink-0 text-[#3a9688]" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="font-medium text-slate-700">Map View</p>
            </div>
            <div className="h-64 w-full">
              <MapView
                lat={selectedAddress?.lat || 10.3157}
                lng={selectedAddress?.lng || 123.8854}
                label="Delivery Location"
              />
            </div>
          </div>
        </>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleAddNewAddress}
      />
    </div>
  );
}