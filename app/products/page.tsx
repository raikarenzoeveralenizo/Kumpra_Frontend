import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <section className="container-shell py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#07245e]">Products</h1>
            <p className="mt-1 text-slate-500">Search and browse products from different stores.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Search products" />
            <select className="rounded-xl border border-slate-200 px-4 py-3"><option>Category</option></select>
            <select className="rounded-xl border border-slate-200 px-4 py-3"><option>Store</option></select>
          </div>
        </div>
        <ProductGrid items={products} />
      </section>
      <Footer />
    </main>
  );
}