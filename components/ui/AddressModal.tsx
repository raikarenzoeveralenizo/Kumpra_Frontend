"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, MapPin, Loader2, Check, Info } from "lucide-react";
import { provinces, cities, barangays } from "select-philippines-address";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("./LocationPicker"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
      Loading Map...
    </div>
  )
});

const CUSTOM_REGIONS = [
  { region_name: "Metro Manila", codes: ["13"] },
  { region_name: "Mindanao", codes: ["09", "10", "11", "12", "15", "16"] },
  { region_name: "North Luzon", codes: ["01", "02", "03", "14"] },
  { region_name: "South Luzon", codes: ["04", "05", "17"] },
  { region_name: "Visayas", codes: ["06", "07", "08"] },
];

export default function AddressModal({ isOpen, onClose, onSubmit, initialData }: any) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    region: { name: "", codes: [] as string[] },
    province: { name: "", code: "" },
    city: { name: "", code: "" },
    barangay: { name: "", code: "" },
    postalCode: "",
    street: "",
    label: "Home",
    isDefault: false,
    lat: 14.5995,
    lng: 120.9842,
  });

  const [activeTab, setActiveTab] = useState("Region");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);

  useEffect(() => {
        if (isOpen) {
          if (initialData) {
            // EDIT MODE: Populate data
            setFormData({
              fullName: initialData.full_name || "",
              phone: initialData.phone || "",
              region: { name: initialData.region || "", codes: [] },
              province: { name: initialData.province || "", code: "" },
              city: { name: initialData.city || "", code: "" },
              barangay: { name: initialData.barangay || "", code: "" },
              postalCode: initialData.postal_code || "",
              street: initialData.street_address || "",
              label: initialData.label || "Home",
              isDefault: initialData.is_default || false,
              lat: parseFloat(initialData.lat) || 14.5995,
              lng: parseFloat(initialData.lng) || 120.9842,
            });
            setActiveTab("Region"); // Even in edit, start tab at Region or Province
          } else {
            // ADD MODE: Reset everything to blank
            setFormData({
              fullName: "", phone: "", region: { name: "", codes: [] },
              province: { name: "", code: "" }, city: { name: "", code: "" },
              barangay: { name: "", code: "" }, postalCode: "", street: "",
              label: "Home", isDefault: false, lat: 14.5995, lng: 120.9842,
            });
            
            // CRITICAL: Force the selection back to the start
            setActiveTab("Region"); 
            setProvinceList([]);
            setCityList([]);
            setBarangayList([]);
          }
        }
      }, [isOpen, initialData]);

  const fetchGeocode = async (query: string) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();
      if (data[0]) setFormData(prev => ({ ...prev, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }));
    } catch (e) { console.error(e); }
  };

  const handleSelection = async (type: string, item: any) => {
    setIsLoadingList(true);
    try {
      if (type === "Region") {
        setFormData({ ...formData, region: { name: item.name, codes: item.codes }, province: { name: "", code: "" }, city: { name: "", code: "" }, barangay: { name: "", code: "" } });
        const results = await Promise.all(item.codes.map((code: string) => provinces(code)));
        setProvinceList(results.flat().sort((a: any, b: any) => a.province_name.localeCompare(b.province_name)));
        setActiveTab("Province");
      } else if (type === "Province") {
        setFormData({ ...formData, province: { name: item.name, code: item.code }, city: { name: "", code: "" }, barangay: { name: "", code: "" } });
        setCityList(await cities(item.code));
        setActiveTab("City");
      } else if (type === "City") {
        setFormData({ ...formData, city: { name: item.name, code: item.code }, barangay: { name: "" , code: "" } });
        setBarangayList(await barangays(item.code));
        setActiveTab("Barangay");
      } else if (type === "Barangay") {
        setFormData({ ...formData, barangay: { name: item.name, code: item.code } });
        setIsDropdownOpen(false);
        fetchGeocode(`${item.name}, ${formData.city.name}, Philippines`);
      }
    } catch (e) { console.error(e); } finally { setIsLoadingList(false); }
  };

  const filteredItems = () => {
    let list: { name: string; code?: string; codes?: string[] }[] = [];
    if (activeTab === "Region") list = CUSTOM_REGIONS.map(r => ({ name: r.region_name, codes: r.codes }));
    else if (activeTab === "Province") list = provinceList.map(p => ({ name: p.province_name, code: p.province_code }));
    else if (activeTab === "City") list = cityList.map(c => ({ name: c.city_name, code: c.city_code }));
    else if (activeTab === "Barangay") list = barangayList.map(b => ({ name: b.brgy_name, code: b.brgy_code }));
    return list.filter(i => (i.name || "").toLowerCase().includes(locationSearch.toLowerCase()));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">{initialData ? "Edit Address" : "Add Address"}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors"><X size={20}/></button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Full Name" value={formData.fullName} className="w-full p-3 bg-slate-50 border rounded-2xl outline-none text-sm" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input placeholder="Phone" value={formData.phone} className="w-full p-3 bg-slate-50 border rounded-2xl outline-none text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="relative">
                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full p-3 border rounded-2xl bg-slate-50 flex justify-between items-center cursor-pointer text-sm">
                  <span className="truncate">
                    {!formData.region.name 
                      ? "Select Area" 
                      : [formData.region.name, formData.province.name, formData.city.name, formData.barangay.name]
                          .filter(Boolean) // This removes empty strings so you don't get ", , "
                          .join(", ")
                    }
                  </span>
                  <ChevronDown size={18} />
                </div>
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border shadow-xl rounded-2xl z-50 overflow-hidden">
                    <div className="flex bg-slate-50 p-1">
                      {["Region", "Province", "City", "Barangay"].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2 text-[10px] font-bold rounded-xl ${activeTab === t ? "bg-white text-orange-600" : "text-slate-400"}`}>{t}</button>
                      ))}
                    </div>
                    <div className="max-h-48 overflow-y-auto p-2">
                      {isLoadingList ? <Loader2 className="animate-spin mx-auto my-4 text-orange-600"/> : filteredItems().map((item, idx) => (
                        <div key={idx} onClick={() => handleSelection(activeTab, item)} className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-sm">{item.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STREET & ZIP CODE GRID */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <input placeholder="House #, Street Address" value={formData.street} className="w-full p-3 bg-slate-50 border rounded-2xl outline-none text-sm" onChange={e => setFormData({...formData, street: e.target.value})} />
                </div>
                <div>
                  <input placeholder="Zip Code" value={formData.postalCode} maxLength={4} className="w-full p-3 bg-slate-50 border rounded-2xl outline-none text-sm" onChange={e => setFormData({...formData, postalCode: e.target.value.replace(/\D/g, "")})} />
                </div>
              </div>

              <div className="h-44 w-full rounded-2xl overflow-hidden border bg-slate-100 relative">
                <LocationPicker lat={formData.lat} lng={formData.lng} onChange={(lat: number, lng: number) => setFormData({...formData, lat, lng})} />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border">
                <span className="text-xs font-bold text-slate-500">Label</span>
                <div className="flex gap-2">
                  {["Home", "Work"].map(l => (
                    <button key={l} onClick={() => setFormData({...formData, label: l})} className={`px-4 py-1 rounded-lg text-xs font-bold ${formData.label === l ? "bg-orange-600 text-white" : "bg-white text-slate-400"}`}>{l}</button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} className="rounded text-orange-600" />
                <span className="text-xs font-medium text-slate-600">Set as default address</span>
              </label>

              <button onClick={() => onSubmit(formData)} className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
                {initialData ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}