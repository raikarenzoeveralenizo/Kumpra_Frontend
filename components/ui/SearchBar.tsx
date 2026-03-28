import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      
      {/* Icon */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b7e4d8]/70 sm:left-4"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search products, stores, categories..."
        className="
          w-full
          rounded-lg sm:rounded-xl

          border border-[#b7e4d8]/20
          bg-[#b7e4d8]/10 backdrop-blur

          py-2.5 sm:py-3
          pl-10 sm:pl-11
          pr-3 sm:pr-4

          text-[13px] sm:text-sm
          text-white placeholder-[#b7e4d8]/60

          outline-none
          transition-all duration-200

          focus:border-[#b7e4d8]
          focus:ring-2 focus:ring-[#b7e4d8]/30
          focus:bg-[#b7e4d8]/15
        "
      />
    </div>
  );
}