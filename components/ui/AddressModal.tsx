"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import { provinces, cities, barangays } from "select-philippines-address";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("./LocationPicker"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold">LOADING MAP...</div>
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
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);

  // Search Recommendation States
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
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
      } else {
        setFormData({
          fullName: "", phone: "", region: { name: "", codes: [] },
          province: { name: "", code: "" }, city: { name: "", code: "" },
          barangay: { name: "", code: "" }, postalCode: "", street: "",
          label: "Home", isDefault: false, lat: 14.5995, lng: 120.9842,
        });
        setProvinceList([]); setCityList([]); setBarangayList([]);
      }
      setActiveTab("Region");
      setIsDropdownOpen(false);
      setSuggestions([]);
    }
  }, [isOpen, initialData]);

  // Handle Recommendation Logic
  const fetchAddressSuggestions = async (input: string) => {
    if (input.length < 3 || !formData.barangay.name) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // The secret sauce: combining street + barangay + city + province
      const query = `${input}, ${formData.barangay.name}, ${formData.city.name}, ${formData.province.name}, Philippines`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=4&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsSearching(false);
    }
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
      }
    } catch (e) { console.error(e); } finally { setIsLoadingList(false); }
  };

  const filteredItems = () => {
    if (activeTab === "Region") return CUSTOM_REGIONS.map(r => ({ name: r.region_name, codes: r.codes }));
    if (activeTab === "Province") return provinceList.map(p => ({ name: p.province_name, code: p.province_code }));
    if (activeTab === "City") return cityList.map(c => ({ name: c.city_name, code: c.city_code }));
    if (activeTab === "Barangay") return barangayList.map(b => ({ name: b.brgy_name, code: b.brgy_code }));
    return [];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A2540]/30 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl flex flex-col overflow-visible"
          >
            {/* Header */}
            <div className="px-8 pt-7 pb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#0A2540]">{initialData ? "Edit Address" : "Add New Address"}</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={20} className="text-slate-400"/></button>
            </div>

            {/* Content Body - strictly non-scrollable */}
            <div className="px-8 pb-8 space-y-4 overflow-visible">
              
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Full Name" value={formData.fullName} className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#459381] text-sm" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input placeholder="Phone" value={formData.phone} className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#459381] text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>

              {/* Step 1: Selection Dropdown */}
              <div className="relative">
                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full px-4 py-3 border border-slate-200 rounded-xl flex justify-between items-center cursor-pointer text-sm">
                  <span className="truncate text-slate-600 font-medium whitespace-nowrap overflow-hidden max-w-[90%]">
                    {!formData.region.name ? "Select Area" : [formData.region.name, formData.province.name, formData.city.name, formData.barangay.name].filter(Boolean).join(", ")}
                  </span>
                  <ChevronDown size={16} className="text-slate-400 shrink-0" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 shadow-2xl rounded-xl z-[70] overflow-hidden">
                    <div className="flex bg-slate-50 p-1 border-b">
                      {["Region", "Province", "City", "Barangay"].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg ${activeTab === t ? "bg-white text-[#459381] shadow-sm" : "text-slate-400"}`}>{t.toUpperCase()}</button>
                      ))}
                    </div>
                    <div className="max-h-40 overflow-y-auto p-1 scrollbar-hide">
                      {isLoadingList ? <Loader2 className="animate-spin mx-auto my-4 text-[#459381]" size={18}/> : filteredItems().map((item, idx) => (
                        <div key={idx} onClick={() => handleSelection(activeTab, item)} className="p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer text-sm text-slate-600">{item.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Street Search with Recommendations */}
              <div className="grid grid-cols-3 gap-3 relative overflow-visible">
                <div className="col-span-2 relative">
                  <input 
                    placeholder={formData.barangay.name ? `Street in ${formData.barangay.name}...` : "Street Address"}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#459381] text-sm" 
                    value={formData.street} 
                    onChange={e => {
                      setFormData({...formData, street: e.target.value});
                      fetchAddressSuggestions(e.target.value);
                    }} 
                  />
                  
                  {/* SEARCH RECOMMENDATIONS POPUP */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 shadow-2xl rounded-xl z-[80] overflow-hidden"
                      >
                        {suggestions.map((s, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              // We extract the name (e.g., Purok, Building Name)
                              const shortName = s.display_name.split(',')[0];
                              setFormData({
                                ...formData, 
                                street: shortName,
                                lat: parseFloat(s.lat),
                                lng: parseFloat(s.lon)
                              });
                              setSuggestions([]);
                            }}
                            className="p-3 hover:bg-slate-50 cursor-pointer text-[11px] text-slate-600 border-b border-slate-50 last:border-0 flex items-start gap-2"
                          >
                            <MapPin size={12} className="mt-0.5 text-[#459381] shrink-0" />
                            <span className="truncate">{s.display_name}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <input placeholder="Postal Code" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-[#459381] text-sm text-center" value={formData.postalCode} maxLength={4} onChange={e => setFormData({...formData, postalCode: e.target.value.replace(/\D/g, "")})} />
              </div>

              {/* Map Section */}
              <div className="h-32 w-full rounded-2xl overflow-hidden border border-slate-100 relative shadow-inner z-0">
                <LocationPicker lat={formData.lat} lng={formData.lng} onChange={(lat: number, lng: number) => setFormData({...formData, lat, lng})} />
              </div>

              <div className="flex items-center justify-between p-1.5 bg-slate-50/50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase ml-2">Label</span>
                <div className="flex gap-2">
                  {["Home", "Work"].map(l => (
                    <button key={l} onClick={() => setFormData({...formData, label: l})} className={`px-5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${formData.label === l ? "bg-[#459381] text-white shadow-sm" : "bg-white text-slate-400 border border-slate-50"}`}>{l}</button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer px-1">
                <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-[#459381]" />
                <span className="text-[11px] font-medium text-slate-500">Set as default address</span>
              </label>

              <button 
                onClick={() => onSubmit(formData)} 
                className="w-full py-4 bg-[#459381] text-white text-base font-bold rounded-2xl hover:bg-[#387a6b] transition-all shadow-lg shadow-[#459381]/20 active:scale-[0.98]"
              >
                {initialData ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}