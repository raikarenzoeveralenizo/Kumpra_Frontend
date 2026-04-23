"use client";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  MessageCircle,
  Store,
} from "lucide-react";

export default function ContactSection({
  organization,
  totalLocations,
}: {
  organization: any;
  totalLocations: number;
}) {
  const email =
    organization.email ||
    `contact@${organization.name?.toLowerCase().replace(/\s+/g, "")}.ph`;

  return (
    <section className="bg-[#f8f8f6] py-14">
      <div className="container-shell grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Get in touch
            </h2>

            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Reach out to {organization.name} for inquiries, bulk orders,
              or partnership opportunities.
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-3 text-sm text-gray-700">

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#2f8f83]" />
              <span>
                {organization.address || "1 Grand Plaza, Business Park"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#2f8f83]" />
              <span>{organization.phone || "+63 900 000 0000"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#2f8f83]" />
              <span>{email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-[#2f8f83]" />
              <span>{organization.website || "www.example.com"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-[#2f8f83]" />
              <span>{organization.hours || "9:00 AM – 10:00 PM"}</span>
            </div>

          </div>

          {/* BUTTON */}
          <button className="flex items-center gap-2 bg-[#2f8f83] text-white px-5 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
            <MessageCircle className="h-4 w-4" />
            Message Seller
          </button>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-white border border-[#ebeae6] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm">

          <div className="h-14 w-14 rounded-full bg-[#2f8f83]/10 text-[#2f8f83] flex items-center justify-center mb-4">
            <Store className="h-6 w-6" />
          </div>

          <p className="text-gray-700 text-sm">
            View {totalLocations} store locations
          </p>

          <button className="mt-2 text-[#2f8f83] text-sm font-medium hover:underline">
            See all locations →
          </button>
        </div>

      </div>
    </section>
  );
}