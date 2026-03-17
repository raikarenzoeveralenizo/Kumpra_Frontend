import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, MapPin, Minus, Plus, Star } from "lucide-react";
import { products } from "@/data/products";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return <div>Product not found</div>;

  const store = stores.find((item) => item.id === product.storeId);

  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      <section className="container-shell py-8">
        {/* Back Button */}
        <Link href="/home" className="flex items-center gap-1 text-xs text-slate-500 hover:text-black mb-6">
          <ChevronLeft className="h-3 w-3" /> Back
        </Link>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Image Placeholder - Matching the Pink/Soft background look */}
          <div className="rounded-3xl bg-[#fce4ec] flex items-center justify-center overflow-hidden" style={{ minHeight: 500 }}>
             {/* Replace with <Image src={product.image} /> when ready */}
             <span className="text-slate-400 italic">Product Image</span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{product.category || "Fruits & Vegetables"}</p>
            <h1 className="mt-2 text-4xl font-serif font-bold text-slate-900">{product.name}</h1>
            
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
              <span className="text-sm font-bold text-slate-700">{product.rating}</span>
              <span className="text-sm text-slate-400">(124 reviews)</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">
                {formatPrice(discountedPrice(product.price, product.discountPercent))}
              </span>
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                Save $4.00
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-md">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-900">Quantity</span>
              <div className="flex items-center rounded-lg border border-slate-200 p-1">
                <button className="p-1 text-slate-400 hover:text-black"><Minus className="h-4 w-4" /></button>
                <span className="px-4 font-semibold">1</span>
                <button className="p-1 text-slate-400 hover:text-black"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <Link 
                href="/cart" 
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#3a9688] py-4 font-bold text-white transition-opacity hover:opacity-90"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Link>
              <Link 
                href="/checkout" 
                className="flex flex-1 items-center justify-center rounded-lg bg-[#faf3e8] py-4 font-bold text-[#d4a373] transition-colors hover:bg-[#f5ebd8]"
              >
                Buy Now
              </Link>
            </div>

            {/* Store Card */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs text-slate-400">Sold by</p>
              <p className="mt-1 font-bold text-slate-900">{store?.name || "Downtown Fresh Market"}</p>
              <Link 
                href={`/store/${store?.slug}`} 
                className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <MapPin className="h-4 w-4" />
                View Store Location
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}