export default function Footer() {
  return (
    <footer className="mt-16 bg-[#07245e] py-10 text-white">
      <div className="container-shell grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">ShopBranch</h3>
          <p className="mt-2 text-sm text-white/80">Modern multi-store ecommerce with delivery and pickup flow.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            <li>Products</li>
            <li>Stores</li>
            <li>Tracking</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Support</h4>
          <p className="mt-2 text-sm text-white/80">Delivery, pickup, order tracking, and account support.</p>
        </div>
      </div>
    </footer>
  );
}