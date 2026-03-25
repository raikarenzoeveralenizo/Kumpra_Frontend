import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      
      {/* Icon */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search products, stores, categories..."
        className="
          w-full
          rounded-lg sm:rounded-xl
          border border-gray-200
          bg-[#f8fafc]
          
          py-2.5 sm:py-3
          pl-10 sm:pl-11
          pr-3 sm:pr-4
          
          text-[13px] sm:text-sm
          text-gray-700
          
          outline-none
          transition-all duration-200
          
          focus:border-[#2f8f83]
          focus:ring-2 focus:ring-[#2f8f83]/20
        "
      />
    </div>
  );
}