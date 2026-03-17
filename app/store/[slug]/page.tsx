import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ui/ProductGrid";
import { stores } from "@/data/stores";
import { products } from "@/data/products";
import StoreMap from "@/components/ui/StoreMap";
import { MapPin, Phone, Clock } from "lucide-react"; // Matching the icons in your photo

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = stores.find((item) => item.slug === slug);

  if (!store) return <div className="p-20 text-center font-bold">Store not found</div>;

  const storeProducts = products.filter((item) => item.storeId === store.id);

  // Using your specific data keys from stores.ts
  const lat = store.latitude; 
  const lng = store.longitude;
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="container-shell py-12">
        {/* Main Grid: Left (Image) | Right (Details) */}
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* LEFT: Banner Image - using store.banner from your data */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
             <img 
               src={store.banner} 
               alt={store.name} 
               className="aspect-square w-full object-cover"
             />
          </div>

          {/* RIGHT: Info & Map Container */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-slate-900 lg:text-5xl tracking-tight">
              {store.name}
            </h1>
            
            <div className="mt-8 space-y-5">
              {/* Address with Emerald Icon */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">{store.address}</p>
              </div>

              {/* Phone with Emerald Icon */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">{store.contactNumber}</p>
              </div>

              {/* Hours (Defaulting to match your photo style) */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="h-5 w-5" />
                </div>
                <p className="text-slate-600 font-medium">8:00 AM - 9:00 PM</p>
              </div>
            </div>

            {/* INTEGRATED MAP - Matches the light-gray placeholder in your photo */}
            <div className="mt-10">
              <StoreMap 
                lat={lat} 
                lng={lng} 
                label={`${store.name} - ${store.branchName}`} 
              />
            </div>
          </div>
        </div>

        {/* PRODUCTS SECTION */}
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