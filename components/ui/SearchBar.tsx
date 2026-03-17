<<<<<<< HEAD
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:ring-1 focus-within:ring-[#07245e]">
=======
export default function SearchBar() {
  return (
    <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
>>>>>>> c6ee3f8a368a765ef2a3b1e8e92e11f84f71e89c
      <input
        type="text"
        placeholder="Search products, stores, categories..."
        className="w-full bg-transparent text-sm outline-none"
      />
<<<<<<< HEAD
      {/* Icon added here at the right side */}
      <button type="submit" className="ml-2 text-slate-400 hover:text-[#07245e] transition-colors">
        <Search className="h-5 w-5" />
      </button>
=======
>>>>>>> c6ee3f8a368a765ef2a3b1e8e92e11f84f71e89c
    </div>
  );
}