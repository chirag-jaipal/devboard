export default function TodosLoading() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-8 w-40 bg-neutral-200 rounded" />

      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 rounded-lg bg-neutral-200" />
      ))}
    </div>
  );
}
