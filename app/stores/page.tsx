import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreCard from "@/components/ui/StoreCard";
import { stores } from "@/data/stores";

export default function AllStoresPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="container-shell py-12">
        {/* Page Title & Description */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-slate-900">Our Stores</h1>
          <p className="mt-2 text-slate-500">
            Find a store near you for pickup or browse their products.
          </p>
        </div>

        {/* Store Grid - 3 columns to match your image */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}