import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import StoreMap from "@/components/ui/StoreMap";
import StoreImageSlider from "@/components/ui/StoreImageSlider";
import { MapPin, Phone, Clock } from "lucide-react";
import type { ApiOutlet } from "@/types/api-outlet";
import type { ApiProduct } from "@/types/api-product";

export default async function StorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [outletsRes, productsRes] = await Promise.all([
    fetch(`${API_URL}/outlets/`, { cache: "no-store" }),
    fetch(`${API_URL}/products/?outlet=${id}`, { cache: "no-store" }),
  ]);

  if (!outletsRes.ok || !productsRes.ok) {
    return <div className="p-20 text-center font-bold">Failed to load store</div>;
  }

  const outlets: ApiOutlet[] = await outletsRes.json();
  const store = outlets.find((item) => String(item.id) === id);

  if (!store) {
    return <div className="p-20 text-center font-bold">Store not found</div>;
  }

  const storeProducts: ApiProduct[] = await productsRes.json();

  const lat = 10.3157;
  const lng = 123.8854;

  const storeGalleryImages = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <section className="container-shell py-8">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="w-full max-w-130">
            <StoreImageSlider images={storeGalleryImages} alt={store.name} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-brand-blue md:text-3xl">
              {store.name}
            </h1>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  {store.address || store.branch_address || "No address available"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                  <Phone className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  {store.phone || store.branch_phone || "No contact available"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  8:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            <div className="mt-6">
              <StoreMap
                lat={lat}
                lng={lng}
                label={`${store.name}${store.branch_name ? ` - ${store.branch_name}` : ""}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="border-b border-slate-100 pb-6 text-2xl font-bold text-slate-900">
            Available Products
          </h2>
          <div className="mt-8">
            <ProductGrid items={storeProducts} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}