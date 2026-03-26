"use client";

import Link from "next/link";
import { Store } from "@/types/store";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

export default function StoreCard({ store, index = 0 }: { store: Store; index?: number }) {
  return (
    <motion.div
      // Animation Settings
      initial={{ opacity: 0, y: 20 }} // Starts invisible and 20px down
      whileInView={{ opacity: 1, y: 0 }} // Animates when it scrolls into view
      viewport={{ once: true }} // Only animate once
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, // Stagger effect: cards appear one after another
        ease: "easeOut" 
      }}
    >
      <Link 
        href={`/store/${store.slug}`} 
        className="group block overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:shadow-lg hover:border-[#3a9688]/30"
      >
        {/* Banner Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
          <img
            src={store.banner}
            alt={store.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"; 
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="font-serif text-xl font-bold text-slate-900 transition-colors group-hover:text-[#3a9688]">
            {store.name}
          </h3>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-[13px] text-slate-400">
              <MapPin className="h-4 w-4 shrink-0 text-slate-300" />
              <span className="line-clamp-1">{store.address || "123 Main Street, Downtown"}</span>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-slate-400">
              <Clock className="h-4 w-4 shrink-0 text-slate-300" />
              <span>8:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}