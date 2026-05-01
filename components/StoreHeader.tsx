"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function StoreHeader({
  organization,
  following,
  setFollowing,
}: {
  organization: any;
  following: boolean;
  setFollowing: (val: boolean) => void;
}) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container-shell py-4 flex items-center gap-4">

        {/* BACK */}
        <Link href="/stores" className="text-gray-400 hover:text-gray-700 transition">
          ←
        </Link>

        {/* LOGO */}
        <div className="h-14 w-14 rounded-lg overflow-hidden border bg-gray-100 shrink-0">
          <img
            src={organization.profilephoto || "https://via.placeholder.com/150"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-bold text-lg md:text-xl truncate">
              {organization.name}
            </h1>

            <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 flex-wrap">
            
            {/* PHONE */}
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {organization.contactnumber || "No contact number"}
            </span>

            {/* EMAIL */}
            <span className="hidden md:flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {organization.email || "No email available"}
            </span>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setFollowing(!following)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              following
                ? "bg-gray-100 text-gray-700"
                : "bg-[#2f8f83] text-white hover:opacity-90"
            }`}
          >
            <Heart className={`h-4 w-4 ${following ? "fill-current" : ""}`} />
            {following ? "Following" : "Follow"}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
            <MessageCircle className="h-4 w-4" />
            Contact
          </button>
        </div>

      </div>
    </div>
  );
}