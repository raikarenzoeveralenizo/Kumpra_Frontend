"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent, ReactNode, InputHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import AuthShowcase from "@/components/auth/AuthShowcase";
import OTPModal from "@/components/ui/OTPModal"; // Path fixed based on your file explorer
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  MapPin,
  Upload,
  Loader2,
  CheckCircle2
} from "lucide-react";

// --- TYPES ---
interface FormData {
  store_name: string;
  owner_name: string;
  email: string;
  contact_number: string;
  password: string;
  confirmPassword: string;
  category: string;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  description: string;
  business_permit: File | null;
  dti_sec_reg: File | null;
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export default function StoreSellerRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // --- FORM STATE ---
  const [formData, setFormData] = useState<FormData>({
    store_name: "",
    owner_name: "",
    email: "",
    contact_number: "",
    password: "",
    confirmPassword: "",
    category: "Bakery & Pastries",
    address: "",
    city: "",
    province: "",
    zip_code: "",
    description: "",
    business_permit: null,
    dti_sec_reg: null,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  // --- OTP VERIFICATION LOGIC ---
  const handleVerifyOTP = async (otp: string) => {
    const response = await fetch("http://localhost:8000/api/verify-email/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        otp: otp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid OTP");
    }

    setTimeout(() => {
      router.push("/login?verified=true");
    }, 2000);
  };

  // --- SUBMIT REGISTRATION ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const data = new FormData();

    data.append("full_name", formData.owner_name);
    data.append("email", formData.email);
    data.append("contact_number", formData.contact_number);
    data.append("password", formData.password);
    data.append("role", "SELLER");

    const sellerDetails = {
      store_name: formData.store_name,
      category: formData.category,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      zip_code: formData.zip_code,
      description: formData.description,
    };
    data.append("seller_details", JSON.stringify(sellerDetails));

    if (formData.business_permit) data.append("business_permit", formData.business_permit);
    if (formData.dti_sec_reg) data.append("dti_sec_reg", formData.dti_sec_reg);

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setRegisteredEmail(formData.email);
        setIsModalOpen(true);
      } else {
        const err = await response.json();
        alert("Registration failed: " + JSON.stringify(err));
      }
    } catch (error) {
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] lg:flex">
      <AuthShowcase variant="seller" />

      <div className="flex min-h-screen w-full items-center justify-center px-3 py-4 sm:px-4 lg:w-1/2 lg:px-6">
        <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className="w-full max-w-md">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <h1 className="text-lg font-serif font-bold text-[#0f172a] sm:text-xl">Store Seller Registration</h1>
            
            <p className="mt-1.5 text-sm text-slate-500">
              {step === 1 && "Step 1 of 3 — Account Info"}
              {step === 2 && "Step 2 of 3 — Store Details"}
              {step === 3 && "Step 3 of 3 — Business Documents"}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1 rounded-full ${step >= i ? "bg-[#2f8f83]" : "bg-slate-200"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="mt-5 space-y-3.5 animate-in fade-in slide-in-from-right-4 duration-300">
                <FormInput label="Store Name *" name="store_name" value={formData.store_name} onChange={handleChange} placeholder="e.g. Juan's Market" required />
                <FormInput label="Owner Full Name *" name="owner_name" value={formData.owner_name} onChange={handleChange} placeholder="Juan Dela Cruz" required />
                <FormInput label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} icon={<Mail size={16}/>} required />
                <FormInput label="Phone Number" name="contact_number" value={formData.contact_number} onChange={handleChange} icon={<Phone size={16}/>} />
                
                <div className="relative">
                  <FormInput label="Password *" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} icon={<Lock size={16}/>} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-400">
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>

                <FormInput label="Confirm Password *" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} icon={<Lock size={16}/>} required />
                
                <button type="button" onClick={nextStep} className="w-full rounded-lg bg-[#2f8f83] py-2.5 font-semibold text-white transition hover:bg-[#26776d]">
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5 space-y-3.5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">Store Category *</label>
                  <div className="relative">
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2f8f83]/20">
                      <option>Bakery & Pastries</option>
                      <option>Groceries</option>
                      <option>Fruits & Vegetables</option>
                      <option>Meat & Seafood</option>
                      <option>Beverages</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                </div>

                <FormInput label="Store Address *" name="address" value={formData.address} onChange={handleChange} icon={<MapPin size={16}/>} required />

                <div className="grid grid-cols-2 gap-3">
                  <FormInput label="City *" name="city" value={formData.city} onChange={handleChange} required />
                  <FormInput label="Province" name="province" value={formData.province} onChange={handleChange} />
                </div>

                <FormInput label="ZIP Code" name="zip_code" value={formData.zip_code} onChange={handleChange} />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-800">Store Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Tell us about your store..." className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-[#2f8f83]/20 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={prevStep} className="rounded-lg border py-2.5 text-sm font-medium hover:bg-slate-50">← Back</button>
                  <button type="button" onClick={nextStep} className="rounded-lg bg-[#2f8f83] py-2.5 text-sm font-semibold text-white">Continue →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <UploadCard title="Business Permit" file={formData.business_permit} onChange={(e) => handleFileChange(e, "business_permit")} />
                <UploadCard title="DTI / SEC Registration" file={formData.dti_sec_reg} onChange={(e) => handleFileChange(e, "dti_sec_reg")} />
                
                <div className="rounded-xl border border-slate-200 bg-[#fcfcfb] p-4">
                  <h3 className="text-sm font-serif font-bold text-slate-900">Terms & Conditions</h3>
                  <p className="mt-1 text-[12px] leading-5 text-slate-500">
                    By submitting, you agree to Kompra.ph's terms.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={prevStep} className="rounded-lg border py-2.5 text-sm font-medium">Back</button>
                  <button type="submit" disabled={loading} className="flex items-center justify-center rounded-lg bg-[#2f8f83] py-2.5 font-semibold text-white">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Application"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <OTPModal 
        isOpen={isModalOpen} 
        email={registeredEmail} 
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerifyOTP}
      />
    </div>
  );
}

// --- HELPER COMPONENTS (Now properly typed) ---

function FormInput({ label, icon, ...props }: FormInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-800">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input 
          {...props} 
          className={`w-full rounded-lg border border-slate-300 py-2.5 ${icon ? 'pl-10' : 'px-3'} text-sm outline-none focus:border-[#2f8f83] transition focus:ring-1 focus:ring-[#2f8f83]`} 
        />
      </div>
    </div>
  );
}

function UploadCard({ title, file, onChange }: { title: string; file: File | null; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-900">{title}</label>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-6 hover:bg-slate-50 transition">
        <input type="file" hidden onChange={onChange} />
        {file ? (
          <div className="flex items-center gap-2 text-[#2f8f83] text-sm font-medium">
            <CheckCircle2 size={20} /> {file.name.length > 25 ? `${file.name.substring(0, 25)}...` : file.name}
          </div>
        ) : (
          <>
            <Upload className="h-7 w-7 text-slate-400" />
            <p className="mt-2 text-sm text-slate-500 text-center">Click to upload business document</p>
          </>
        )}
      </label>
    </div>
  );
}