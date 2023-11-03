/* eslint-disable @next/next/no-img-element */

export default function PromptItem({
  promptItem,
}: {
  promptItem: PromptItemDisplayData;
}) {
  return (
    <>
      {promptItem?.image && (
        <div className="shrink-0 h-20 w-[90px] rounded relative overflow-hidden">
          <img
            alt={promptItem.title}
            src={promptItem.image}
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>
      )}
      <div className="grow">
        <h4 className="font-medium text-xs text-white leading-[1.125rem] m-0">
          {promptItem && promptItem.title}
        </h4>
        <p className="text-gray-400 m-0 text-xs leading-[1.125rem] break-all">
          <a
            href={promptItem.url}
            className="no-underline after:absolute after:inset-0"
            target="_blank"
            rel="noreferrer noopener"
          >
            {promptItem && promptItem.source && promptItem.source.split("/")[0]}
          </a>
        </p>
      </div>
    </>
  );
}
