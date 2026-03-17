import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { orders } from "@/data/orders";
import OrderProgressTracker from "@/components/ui/OrderProgressTracker";
import DeliveryStatusCard from "@/components/ui/DeliveryStatusCard";
import RiderAssignedCard from "@/components/ui/RiderAssignedCard";

export default async function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id) || orders[0];

  return (
    <main>
      <Header />
      <section className="container-shell space-y-6 py-8">
        <div className="card p-5">
          <p className="text-sm text-slate-500">Order Number</p>
          <h1 className="mt-1 text-3xl font-bold text-[#07245e]">{order.orderNumber}</h1>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Order Type</p>
              <p className="mt-1 font-semibold capitalize text-[#07245e]">{order.orderType}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Assigned Store</p>
              <p className="mt-1 font-semibold text-[#07245e]">{order.assignedStore}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">ETA</p>
              <p className="mt-1 font-semibold text-orange-500">{order.estimatedDeliveryTime}</p>
            </div>
          </div>
        </div>

        <DeliveryStatusCard status={order.status} />
        <OrderProgressTracker currentStep={order.currentStep} />
        <RiderAssignedCard order={order} />

        <div className="card p-5">
          <h3 className="text-lg font-bold text-[#07245e]">Delivery Address</h3>
          <p className="mt-3 text-slate-600">{order.deliveryAddress}</p>
          <div className="mt-5 h-64 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
            Map placeholder for live delivery tracking
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}