import { DeliveryStatus } from "@/types/order";

const statusMessages: Record<DeliveryStatus, string> = {
  preparing_item: "Your order is now being prepared by the store.",
  waiting_for_rider_assign: "We are currently looking for a rider to deliver your order.",
  rider_assigned: "A rider has been assigned to your order.",
  on_delivery: "Your order is now on the way.",
  delivered: "Your order has been delivered successfully.",
};

const statusTitles: Record<DeliveryStatus, string> = {
  preparing_item: "Preparing Item",
  waiting_for_rider_assign: "Waiting for Rider Assign",
  rider_assigned: "Rider Assigned",
  on_delivery: "On Delivery",
  delivered: "Delivered",
};

export default function DeliveryStatusCard({ status }: { status: DeliveryStatus }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Current Status</p>
          <h3 className="mt-1 text-xl font-bold text-[#07245e]">{statusTitles[status]}</h3>
          <p className="mt-2 text-sm text-slate-600">{statusMessages[status]}</p>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-2xl">
          {status === "preparing_item" && <span className="animate-spin">📦</span>}
          {status === "waiting_for_rider_assign" && <span className="animate-pulse">📡</span>}
          {status === "rider_assigned" && <span className="animate-bounce">🛵</span>}
          {status === "on_delivery" && <span className="animate-bounce">🚚</span>}
          {status === "delivered" && <span>✅</span>}
        </div>
      </div>
    </div>
  );
}