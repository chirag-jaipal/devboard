export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-neutral-200 rounded" />

      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-neutral-200" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 rounded-xl bg-neutral-200" />
        <div className="h-64 rounded-xl bg-neutral-200" />
      </div>
    </div>
  );
}
