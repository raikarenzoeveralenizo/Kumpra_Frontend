export default function SearchBar() {
  return (
    <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <input
        type="text"
        placeholder="Search products, stores, categories..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}