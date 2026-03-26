"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Clock3,
  Package,
  Camera,
  Pencil,
  X,
  ShoppingBag,
} from "lucide-react";

type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  
};

type OrderItem = {
  id: string;
  date: string;
  total: string;
  status: "Delivered" | "Pending" | "Processing";
  items: number;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"info" | "orders">("info");
  const [isEditOpen, setIsEditOpen] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
        const user = JSON.parse(storedUser);

        const userProfile = {
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        birthday: user.birthday || "",
        gender: user.gender || "",
        };

        setProfile(userProfile);
        setFormData(userProfile);
    }
    }, []);

    const formatBirthday = (value: string) => {
      if (!value) return "";

      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        if (!isNaN(date.getTime())) {
          return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(date);
        }
      }

      const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) {
          return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(parsed);
        }

        return value;
      };

  const [profile, setProfile] = useState<ProfileData>({
  fullName: "",
  email: "",
  phone: "",
  birthday: "",
  gender: "",
});

  const [formData, setFormData] = useState<ProfileData>(profile);

  const recentOrders: OrderItem[] = useMemo(
    () => [
      {
        id: "ORD-1001",
        date: "March 22, 2026",
        total: "₱1,258",
        status: "Delivered",
        items: 2,
      },
      {
        id: "ORD-1002",
        date: "March 20, 2026",
        total: "₱764",
        status: "Pending",
        items: 1,
      },
      {
        id: "ORD-1003",
        date: "March 18, 2026",
        total: "₱2,022",
        status: "Processing",
        items: 4,
      },
    ],
    []
  );

  const stats = {
    orders: 12,
    wishlist: 8,
    pending: 2,
  };

  const initials = profile.fullName
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleOpenEdit = () => {
    setFormData(profile);
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    setProfile(formData);

    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
        const user = JSON.parse(storedUser);

        localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            ...user,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            birthday: formData.birthday,
            gender: formData.gender,
        })
        );
    }

    setIsEditOpen(false);
    };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const infoItems = [
    {
      icon: User,
      label: "Full Name",
      value: profile.fullName,
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
    },
    {
      icon: Calendar,
      label: "Birthday",
      value: formatBirthday(profile.birthday),
    },
    {
      icon: User,
      label: "Gender",
      value: profile.gender,
    },
    
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="pb-12">
        {/* Cover */}
        <div className="h-37.5 w-full bg-[#2f8f83] sm:h-45 md:h-52.5" />

        <div className="container-shell -mt-14 sm:-mt-16">
          <div className="mx-auto max-w-4xl">
            {/* Profile Header */}
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                <div className="relative shrink-0">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#3a9688] text-3xl font-bold text-white shadow-lg sm:h-28 sm:w-28">
                    {initials}
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-1 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#de922f] text-white shadow-md transition hover:scale-105"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-12 sm:mt-14 md:mt-16 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">
                        {profile.fullName}
                    </h1>
                    <p className=" text-sm text-slate-500 sm:text-base">
                        {profile.email}
                    </p>
                    </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-[#de922f] hover:bg-[#de922f] hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4] text-[#2f8f83]">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-blue">{stats.orders}</p>
                    <p className="text-sm text-slate-500">Orders</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4] text-[#2f8f83]">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-blue">{stats.wishlist}</p>
                    <p className="text-sm text-slate-500">Wishlist</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4] text-[#2f8f83]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-blue">{stats.pending}</p>
                    <p className="text-sm text-slate-500">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 inline-flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "info"
                    ? "bg-white text-brand-blue shadow-sm"
                    : "text-slate-500 hover:text-brand-blue"
                }`}
              >
                My Info
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === "orders"
                    ? "bg-white text-brand-blue shadow-sm"
                    : "text-slate-500 hover:text-brand-blue"
                }`}
              >
                Recent Orders
              </button>
            </div>

            {/* Content */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {activeTab === "info" ? (
                <div className="divide-y divide-slate-200">
                  {infoItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="mt-1 wrap-break-word text-base font-medium text-brand-blue">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((orderItem) => (
                    <div
                      key={orderItem.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-[#2f8f83]" />
                            <p className="text-base font-semibold text-brand-blue">
                              {orderItem.id}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{orderItem.date}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              orderItem.status === "Delivered"
                                ? "bg-[#edf7f4] text-[#2f8f83]"
                                : orderItem.status === "Pending"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {orderItem.status}
                          </span>

                          <p className="text-sm text-slate-500">
                            {orderItem.items} item{orderItem.items > 1 ? "s" : ""}
                          </p>

                          <p className="text-base font-bold text-brand-blue">
                            {orderItem.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-bold text-brand-blue">Edit Profile</h2>

              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2f8f83]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2f8f83]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2f8f83]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Birthday
                </label>

                <input
                  type="text"
                  value={formatBirthday(formData.birthday)}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2f8f83]"
                    >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
              </div>

            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-[#de922f] hover:text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}