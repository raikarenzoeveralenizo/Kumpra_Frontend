
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, MapPin, Loader2, Check, Info } from "lucide-react";
import { provinces, cities, barangays } from "select-philippines-address";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Leaflet Fix
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const CUSTOM_REGIONS = [
  { region_name: "Metro Manila", codes: ["13"] },
  { region_name: "Mindanao", codes: ["09", "10", "11", "12", "15", "16"] },
  { region_name: "North Luzon", codes: ["01", "02", "03", "14"] },
  { region_name: "South Luzon", codes: ["04", "05", "17"] },
  { region_name: "Visayas", codes: ["06", "07", "08"] },
];

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], 16); }, [lat, lng, map]);
  return null;
}

export default function AddressModal({ isOpen, onClose, onSubmit }: any) {
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
    lat: 12.8797,
    lng: 121.7740,
  });

  const [activeTab, setActiveTab] = useState("Region");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [streetSuggestions, setStreetSuggestions] = useState<any[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isSearchingStreet, setIsSearchingStreet] = useState(false);

  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);

  const getAddressDisplay = () => {
    const { region, province, city, barangay } = formData;
    if (!region.name) return "Region, Province, City, Barangay";
    return [region.name, province.name, city.name, barangay.name].filter(Boolean).join(", ");
  };

  const handleSelection = async (type: string, item: any) => {
    setLocationSearch("");
    setIsLoadingList(true);
    try {
      if (type === "Region") {
        setFormData({ ...formData, region: { name: item.name || item.region_name, codes: item.codes }, province: { name: "", code: "" }, city: { name: "", code: "" }, barangay: { name: "", code: "" } });
        const results = await Promise.all(item.codes.map((code: string) => provinces(code)));
        setProvinceList(results.flat().sort((a: any, b: any) => a.province_name.localeCompare(b.province_name)));
        setActiveTab("Province");
      } else if (type === "Province") {
        setFormData({ ...formData, province: { name: item.name || item.province_name, code: item.province_code || item.code }, city: { name: "", code: "" }, barangay: { name: "", code: "" } });
        setCityList(await cities(item.province_code || item.code));
        setActiveTab("City");
      } else if (type === "City") {
        setFormData({ ...formData, city: { name: item.name || item.city_name, code: item.city_code || item.code }, barangay: { name: "", code: "" } });
        setBarangayList(await barangays(item.city_code || item.code));
        setActiveTab("Barangay");
      } else if (type === "Barangay") {
        setFormData({ ...formData, barangay: { name: item.name || item.brgy_name, code: item.brgy_code || item.code } });
        setIsDropdownOpen(false);
        fetchGeocode(`${item.name || item.brgy_name}, ${formData.city.name}, Philippines`);
      }
    } catch (e) { console.error(e); } finally { setIsLoadingList(false); }
  };

  const fetchGeocode = async (query: string) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();
      if (data[0]) setFormData(prev => ({ ...prev, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }));
    } catch (e) { console.error(e); }
  };

  const handleStreetChange = async (val: string) => {
    setFormData({ ...formData, street: val });
    if (val.length < 3 || !formData.barangay.name) { setStreetSuggestions([]); return; }
    setIsSearchingStreet(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val + ", " + formData.barangay.name + ", " + formData.city.name)}&limit=5`);
      setStreetSuggestions(await res.json());
    } catch (e) { console.error(e); } finally { setIsSearchingStreet(false); }
  };

  const filteredItems = () => {
    let list = [];
    if (activeTab === "Region") list = CUSTOM_REGIONS.map(r => ({ ...r, name: r.region_name }));
    else if (activeTab === "Province") list = provinceList.map(p => ({ ...p, name: p.province_name, code: p.province_code }));
    else if (activeTab === "City") list = cityList.map(c => ({ ...c, name: c.city_name, code: c.city_code }));
    else if (activeTab === "Barangay") list = barangayList.map(b => ({ ...b, name: b.brgy_name, code: b.brgy_code }));
    return list.filter(i => (i.name || "").toLowerCase().includes(locationSearch.toLowerCase()));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[95vh]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">New Address</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-600 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                  <input placeholder="Juan Dela Cruz" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#3a9688] focus:bg-white focus:ring-4 focus:ring-[#3a9688]/5 transition-all text-sm font-medium" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                  <input placeholder="0912 345 6789" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#3a9688] focus:bg-white focus:ring-4 focus:ring-[#3a9688]/5 transition-all text-sm font-medium" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              {/* Location Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Area Details</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className={`w-full p-3.5 border rounded-2xl flex justify-between items-center cursor-pointer transition-all ${isDropdownOpen ? 'border-[#3a9688] bg-white ring-4 ring-[#3a9688]/5' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <span className={`truncate text-sm font-medium ${formData.region.name ? 'text-slate-700' : 'text-slate-400'}`}>
                      {getAddressDisplay()}
                    </span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#3a9688]' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="flex bg-slate-50/80 p-1 gap-1">
                          {["Region", "Province", "City", "Barangay"].map((tab) => (
                            <button 
                              key={tab} onClick={() => setActiveTab(tab)} 
                              className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? "bg-white text-[#3a9688] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                          {isLoadingList ? (
                            <div className="py-12 flex flex-col items-center gap-3">
                              <Loader2 className="h-6 w-6 animate-spin text-[#3a9688]" />
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Updating List...</span>
                            </div>
                          ) : (
                            filteredItems().map((item: any, idx: number) => (
                              <div 
                                key={idx} onClick={() => handleSelection(activeTab, item)} 
                                className={`p-3.5 rounded-xl transition-all cursor-pointer text-sm font-medium flex justify-between items-center ${formData[activeTab.toLowerCase() as keyof typeof formData]?.name === item.name ? 'bg-[#3a9688]/10 text-[#3a9688]' : 'hover:bg-slate-50 text-slate-600'}`}
                              >
                                {item.name}
                                {formData[activeTab.toLowerCase() as keyof typeof formData]?.name === item.name && <Check size={14} />}
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Street & Postal */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Street Address</label>
                  <div className="relative">
                    <input 
                      placeholder="House # / Street Name" 
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#3a9688] focus:bg-white transition-all text-sm font-medium" 
                      value={formData.street} onChange={e => handleStreetChange(e.target.value)} 
                    />
                    <AnimatePresence>
                      {streetSuggestions.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 5 }} className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl z-[60] overflow-hidden p-2">
                          {streetSuggestions.map((item, idx) => (
                            <div key={idx} onClick={() => { setFormData({...formData, street: item.display_name.split(',')[0], lat: parseFloat(item.lat), lng: parseFloat(item.lon)}); setStreetSuggestions([]); }} className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer flex items-start gap-3 transition-colors">
                              <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><MapPin size={14} /></div>
                              <div className="text-sm">
                                <p className="font-bold text-slate-700">{item.display_name.split(',')[0]}</p>
                                <p className="text-[10px] text-slate-400 line-clamp-1">{item.display_name}</p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Postal</label>
                  <input placeholder="6000" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#3a9688] focus:bg-white transition-all text-sm font-medium" onChange={e => setFormData({...formData, postalCode: e.target.value})} />
                </div>
              </div>

              {/* Map Section */}
              <div className="space-y-2">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 flex gap-3 items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Info size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-800">Place an accurate pin</p>
                    <p className="text-[10px] text-amber-700/80 leading-tight">Click the map to adjust the exact delivery spot.</p>
                  </div>
                </div>
                
                <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative z-0 group">
                  <MapContainer center={[formData.lat, formData.lng]} zoom={16} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[formData.lat, formData.lng]} icon={customIcon} />
                    <RecenterMap lat={formData.lat} lng={formData.lng} />
                  </MapContainer>
                  <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-400 pointer-events-none">OpenStreetMap</div>
                </div>
              </div>

              {/* Label & Default */}
              <div className="flex flex-col gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Label As</span>
                  <div className="flex bg-slate-200/50 p-1 rounded-xl gap-1">
                    {["Home", "Work"].map(l => (
                      <button key={l} type="button" onClick={() => setFormData({...formData, label: l})} className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.label === l ? "bg-white text-[#3a9688] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div onClick={() => setFormData({...formData, isDefault: !formData.isDefault})} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.isDefault ? "bg-[#3a9688] border-[#3a9688]" : "border-slate-200 bg-white group-hover:border-slate-300"}`}>
                    {formData.isDefault && <Check size={14} className="text-white" strokeWidth={4} />}
                  </div>
                  <span className="text-xs font-bold text-slate-500">Set as Default Address</span>
                </label>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-4 pt-2">
                <button onClick={onClose} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors text-sm">Cancel</button>
                <button 
                  onClick={() => onSubmit(formData)} 
                  className="flex-[2] py-4 bg-[#f05023] hover:bg-[#d9441c] text-white font-black text-sm rounded-2xl shadow-[0_10px_20px_rgba(240,80,35,0.2)] active:scale-[0.97] transition-all"
                >
                  SAVE ADDRESS
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}