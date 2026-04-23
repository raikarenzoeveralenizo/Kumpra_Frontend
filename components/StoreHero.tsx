"use client";

export default function StoreHero({ organization }: any) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e";

  return (
    <div className="relative h-65 md:h-95 w-full overflow-hidden">

      {/* IMAGE */}
      <img
        src={organization.coverImage || fallbackImage}
        className="w-full h-full object-cover"
        alt="Store Cover"
      />

      {/* SOFT GRADIENT (important fix) */}
      <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/70 to-transparent" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-shell">

          {/* BADGE */}
            <span className="inline-flex items-center gap-1.5 bg-[#d98b2b] text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
                />
            </svg>

            Trusted Supplier
            </span>

          {/* TITLE */}
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {organization.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-3 max-w-xl text-sm md:text-base text-gray-600 leading-relaxed">
            {organization.description ||
              "We provide high-quality products with trusted service across multiple locations."}
          </p>

        </div>
      </div>
    </div>
  );
}