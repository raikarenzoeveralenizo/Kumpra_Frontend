"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { ApiOutlet } from "@/types/api-outlet";

export default function StoreCard({
  store,
  index = 0,
}: {
  store: ApiOutlet;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/store/${store.id}`}
        className="group block overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:border-[#3a9688]/30 hover:shadow-lg"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
            alt={store.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h3 className="font-serif text-xl font-bold text-slate-900 transition-colors group-hover:text-[#3a9688]">
            {store.name}
          </h3>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-[13px] text-slate-400">
              <MapPin className="h-4 w-4 shrink-0 text-slate-300" />
              <span className="line-clamp-1">
                {store.address || store.branch_address || "No address available"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[13px] text-slate-400">
              <Clock className="h-4 w-4 shrink-0 text-slate-300" />
              <span>{store.phone || store.branch_phone || "Contact unavailable"}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}