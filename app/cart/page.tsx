import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { products } from "@/data/products";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = products.slice(0, 2);
  const total = items.reduce((sum, item) => sum + discountedPrice(item.price, item.discountPercent), 0);

  return (
    <main>
      <Header />
      <section className="container-shell py-8">
        <h1 className="text-3xl font-bold text-[#07245e]">Your Cart</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold text-[#07245e]">{item.name}</p>
                  <p className="text-sm text-slate-500">Quantity: 1</p>
                </div>
                <p className="font-bold text-orange-500">{formatPrice(discountedPrice(item.price, item.discountPercent))}</p>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-bold text-[#07245e]">Summary</h2>
            <div className="mt-4 flex items-center justify-between">
              <span>Total</span>
              <span className="font-bold text-orange-500">{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}