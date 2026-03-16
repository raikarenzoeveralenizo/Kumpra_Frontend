import { deliverySteps } from "@/lib/utils";

export default function OrderProgressTracker({ currentStep }: { currentStep: number }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold text-[#07245e]">Delivery Progress</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {deliverySteps.map((step, index) => {
          const active = index === currentStep;
          const done = index < currentStep;
          return (
            <div key={step} className="flex flex-col items-center text-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                  done
                    ? "bg-[#07245e] text-white"
                    : active
                    ? "animate-pulse bg-orange-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? "✓" : index + 1}
              </div>
              <p className={`mt-3 text-sm font-medium ${active ? "text-orange-500" : "text-[#07245e]"}`}>{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}