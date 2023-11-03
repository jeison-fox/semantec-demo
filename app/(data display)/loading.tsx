export default function Loading() {
  return (
    <div className="bg-slate-800 gap-x-7 grid grid-cols-page-loading h-full p-6 relative w-full z-10">
      <div className="bg-gray-700 h-full rounded animate-pulse" />
      <div className="bg-gray-700 h-full rounded animate-pulse" />
    </div>
  );
}
