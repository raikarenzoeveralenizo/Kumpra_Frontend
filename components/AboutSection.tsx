"use client";

export default function AboutSection({
  organization,
  totalProducts,
}: any) {
  return (
    <section className="bg-[#f8f8f6] py-6">
      <div className="container-shell grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              About {organization.name}
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {organization.description ||
                "We are committed to delivering high-quality products and excellent customer service."}
            </p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 gap-4 pt-2">

            <div className="bg-white border border-[#ebeae6] rounded-xl p-4">
              <p className="text-xs text-gray-500">Established</p>
              <p className="font-semibold text-lg mt-1">
                {organization.established || "2008"}
              </p>
            </div>

            <div className="bg-white border border-[#ebeae6] rounded-xl p-4">
              <p className="text-xs text-gray-500">Total Products</p>
              <p className="font-semibold text-lg mt-1">
                {totalProducts}
              </p>
            </div>

            <div className="bg-white border border-[#ebeae6] rounded-xl p-4">
              <p className="text-xs text-gray-500">Locations</p>
              <p className="font-semibold text-lg mt-1">
                {(organization.total_branches || 0) +
                  (organization.total_outlets || 0)}
              </p>
            </div>

            <div className="bg-white border border-[#ebeae6] rounded-xl p-4">
              <p className="text-xs text-gray-500">Website</p>
              <p className="font-semibold text-sm mt-1 truncate">
                {organization.website || "www.example.com"}
              </p>
            </div>
          </div>

          {/* FOOT INFO */}
          <p className="text-xs text-gray-500 pt-2">
            {organization.total_branches || 0} branches ·{" "}
            {organization.total_outlets || 0} outlets
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="rounded-xl overflow-hidden border border-[#ebeae6] shadow-sm">
          <img
            src={
              organization.coverImage ||
              "https://images.unsplash.com/photo-1542838132-92c53300491e"
            }
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}