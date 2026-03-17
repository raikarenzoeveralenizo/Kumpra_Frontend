import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { products } from "@/data/products";
import { stores } from "@/data/stores";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return <div>Product not found</div>;

  const store = stores.find((item) => item.id === product.storeId);

  return (
    <main>
      <Header />
      <section className="container-shell grid gap-10 py-8 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-100" style={{ minHeight: 420 }} />
        <div>
          <p className="text-sm font-medium text-orange-500">{product.badge}</p>
          <h1 className="mt-2 text-4xl font-bold text-[#07245e]">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-bold text-orange-500">{formatPrice(discountedPrice(product.price, product.discountPercent))}</span>
            <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Rating</p>
              <p className="mt-1 font-semibold text-[#07245e]">★ {product.rating}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Store</p>
              <p className="mt-1 font-semibold text-[#07245e]">{store?.name}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cart" className="btn-outline">Add to Cart</Link>
            <Link href="/checkout" className="btn-primary">Buy Now</Link>
            <Link href={`/store/${store?.slug}`} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-[#07245e]">View Store Location</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}