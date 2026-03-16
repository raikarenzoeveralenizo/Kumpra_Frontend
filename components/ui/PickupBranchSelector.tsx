import { stores } from "@/data/stores";

export default function PickupBranchSelector() {
  return (
    <div className="card space-y-4 p-5">
      <h3 className="text-lg font-bold text-[#07245e]">Pickup Branch</h3>
      <div className="grid gap-3">
        {stores.map((store) => (
          <label key={store.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
            <input type="radio" name="pickupStore" className="mt-1" />
            <div>
              <p className="font-semibold text-[#07245e]">{store.name}</p>
              <p className="text-sm text-slate-500">{store.branchName}</p>
              <p className="text-sm text-slate-500">{store.address}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="h-56 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        Map placeholder showing branch/store locations
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Optional pickup date" />
        <input className="rounded-xl border border-slate-200 px-4 py-3" placeholder="Optional pickup time" />
      </div>
    </div>
  );
}