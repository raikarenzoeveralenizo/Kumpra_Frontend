import { Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Kompra.ph"
            className="h-10 w-auto"
          />
        </div>

        <div className="mx-6 hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products, stores..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#2f8f83] focus:ring-2 focus:ring-[#2f8f83]/20"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="font-medium text-gray-600 transition hover:text-black">
            Products
          </a>

          <a href="#" className="font-medium text-gray-600 transition hover:text-black">
            Stores
          </a>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-black"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-[15px] font-medium text-gray-900 transition hover:bg-gray-50">
            <User size={18} />
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}