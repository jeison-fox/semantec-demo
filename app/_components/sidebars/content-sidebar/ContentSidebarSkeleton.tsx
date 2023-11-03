import PromptItemSkeleton from "@/components/prompt-item/PromptItemSkeleton";

const articleClasses =
  "border-0 border-solid border-b border-gray-700 flex gap-x-2 pb-8 relative";

export default function ContentSidebarSkeleton() {
  return (
    <>
      <div className={articleClasses}>
        <PromptItemSkeleton />
      </div>
      <div className={articleClasses}>
        <PromptItemSkeleton />
      </div>
      <div className={articleClasses}>
        <PromptItemSkeleton />
      </div>
      <div className={articleClasses}>
        <PromptItemSkeleton />
      </div>
    </>
  );
}
