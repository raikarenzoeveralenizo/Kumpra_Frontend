import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/home" className="text-2xl font-extrabold text-[#07245e]">
            Kumpra.ph
          </Link>
        </div>

        <div className="flex flex-1 items-center gap-3 md:max-w-3xl">
          <SearchBar />
          <Link href="/cart" className="rounded-xl bg-[#07245e] p-3 text-white">
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}