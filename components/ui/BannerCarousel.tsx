"use client";

import { useEffect, useState } from "react";
import { banners } from "@/data/banners";
// 1. Rename the import here using 'as'
import NextImage from "next/image"; 

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#07245e] p-8 md:p-12 shadow-md min-h-[400px] flex items-center">
      <div className="grid w-full gap-8 md:grid-cols-2 items-center">
        
        <div key={currentIndex} className="animate-fade-in z-20">
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Exclusive Promo</p>
          <h3 className="mt-2 text-3xl font-bold text-white md:text-5xl leading-tight">{currentBanner.title}</h3>
          <p className="mt-4 text-lg text-white/70">{currentBanner.subtitle}</p>
          <button className="mt-8 rounded-full bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-950/20">
            Shop Now
          </button>
        </div>

        <div className="relative h-64 md:h-80 overflow-hidden rounded-xl z-10 w-full">
          <div 
            className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div key={banner.id} className="relative w-full shrink-0 h-full">
                {/* 2. Use the renamed component 'NextImage' here */}
                <NextImage 
                  src={banner.image} 
                  alt={banner.title} 
                  fill
                  priority={index === 0}
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07245e]/40 to-transparent rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-8 flex gap-2 z-30">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentIndex === i ? "w-8 bg-orange-500" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}