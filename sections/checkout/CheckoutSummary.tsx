import { products } from "@/data/products";
import { discountedPrice, formatPrice } from "@/lib/utils";

export default function CheckoutSummary() {
  const items = products.slice(0, 2);
  const subtotal = items.reduce((sum, item) => sum + discountedPrice(item.price, item.discountPercent), 0);

  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold text-[#07245e]">Order Summary</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-[#07245e]">{item.name}</p>
              <p className="text-sm text-slate-500">Qty: 1</p>
            </div>
            <p className="font-semibold text-orange-500">{formatPrice(discountedPrice(item.price, item.discountPercent))}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between font-bold text-[#07245e]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}