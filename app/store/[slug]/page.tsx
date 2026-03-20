import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { stores } from "@/data/stores";
import { products } from "@/data/products";
import StoreMap from "@/components/ui/StoreMap";
import StoreImageSlider from "@/components/ui/StoreImageSlider";
import { MapPin, Phone, Clock } from "lucide-react";

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = stores.find((item) => item.slug === slug);

  if (!store) return <div className="p-20 text-center font-bold">Store not found</div>;

  const storeProducts = products.filter((item) => item.storeId === store.id);

  const lat = store.latitude;
  const lng = store.longitude;

  const storeGalleryImages = [
    store.banner,
    store.banner,
    store.banner,
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="container-shell py-8">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          
          {/* LEFT: Slider (slightly constrained width) */}
          <div className="w-full max-w-130">
            <StoreImageSlider 
              images={storeGalleryImages} 
              alt={store.name} 
            />
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col">
            
            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-brand-blue md:text-3xl">
              {store.name}
            </h1>

            {/* Info Items */}
            <div className="mt-6 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  {store.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Phone className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  {store.contactNumber}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  8:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6">
              <StoreMap 
                lat={lat} 
                lng={lng} 
                label={`${store.name} - ${store.branchName}`} 
              />
            </div>
          </div>
        </div>


        {/* PRODUCTS SECTION (Unchanged) */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-6">
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