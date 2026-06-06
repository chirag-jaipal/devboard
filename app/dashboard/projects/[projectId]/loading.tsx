export default function ProjectDetailsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-72 bg-neutral-200 rounded" />

      <div className="h-32 rounded-xl bg-neutral-200" />

      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-20 rounded-lg bg-neutral-200" />
      ))}
    </div>
  );
}
