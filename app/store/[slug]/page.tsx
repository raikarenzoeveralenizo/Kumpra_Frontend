import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { stores } from "@/data/stores";
import { products } from "@/data/products";
import StoreMap from "@/components/ui/StoreMap";
// 1. Import the new Slider component
import StoreImageSlider from "@/components/ui/StoreImageSlider"; 
import { MapPin, Phone, Clock } from "lucide-react";

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = stores.find((item) => item.slug === slug);

  if (!store) return <div className="p-20 text-center font-bold">Store not found</div>;

  const storeProducts = products.filter((item) => item.storeId === store.id);

  const lat = store.latitude; 
  const lng = store.longitude;

  // 2. Mimic multiple images for the carousel using the single banner
  const storeGalleryImages = [
    store.banner,
    store.banner, // Replace these with unique image URLs later
    store.banner,
  ];
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="container-shell py-12">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* LEFT: Replaced single <img> with the new Slider */}
          <div className="w-full">
            <StoreImageSlider 
              images={storeGalleryImages} 
              alt={store.name} 
            />
          </div>

          {/* RIGHT: Info & Map Container (Unchanged) */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-slate-900 lg:text-5xl tracking-tight">
              {store.name}
            </h1>
            
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">{store.address}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">{store.contactNumber}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">8:00 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="mt-10">
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