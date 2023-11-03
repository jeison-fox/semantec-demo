export default function PromptItemSkeleton() {
  return (
    <>
      <div className="bg-gray-600 shrink-0 h-20 w-[90px] rounded animate-pulse" />
      <div className="flex flex-col grow gap-y-1">
        <div className="bg-gray-600 h-3 rounded w-full animate-pulse" />
        <div className="bg-gray-600 h-3 rounded w-full animate-pulse" />
        <div className="bg-gray-600 h-3 rounded w-full animate-pulse" />
        <div className="bg-gray-600 h-3 rounded w-full animate-pulse" />
        <div className="bg-gray-600 h-3 rounded w-1/3 animate-pulse" />
      </div>
    </>
  );
}
