export default function AuthHero() {
  return (
    <div className="space-y-8">
      {/* TITLE */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Home Cost Manager
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed">
          Track your household expenses easily and stay in control of your
          monthly budget.
        </p>
      </div>

      {/* IMAGE */}
      <div className="rounded-3xl overflow-hidden shadow-xl border bg-gray-50">
        <img
          src="/auth-preview.png"
          alt="HomeCost Preview"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
