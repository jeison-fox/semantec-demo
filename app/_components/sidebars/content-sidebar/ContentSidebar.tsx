"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import ContentSidebarHeader from "@/components/sidebars/content-sidebar/ContentSidebarHeader";
import ContentSidebarItem from "@/components/sidebars/content-sidebar/ContentSidebarItem";
import ContentSidebarSkeleton from "@/components/sidebars/content-sidebar/ContentSidebarSkeleton";
import { dataTypes } from "@/constants/general";
import ContentSidebarContext from "@/context/ContentSidebarContext";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import PromptContext from "@/context/PromptContext";
import { promptMapping } from "@/utils/prompt";

export default function ContentSidebar() {
  const pathname = usePathname();
  const { highlightedPromptItems, prompts, setHighlightedPromptItems } =
    useContext(PromptContext);
  const {
    loadingGeographic,
    loadingOpenGraph,
    loadingTrends,
    urlMetadataCache,
  } = useContext(DataVisualizationContext);
  const { isContentSidebarOpen, sidebarRef } = useContext(
    ContentSidebarContext,
  );
  const [selectedPrompts, setSelectedPrompts] = useState<PromptKey[]>([]);

  /**
   * Determines if the URL is unique and present in the `urlCache`.
   *
   * It checks if the URL exists in `urlCache` and hasn't been marked as unique in `uniqueUrls`.
   * If valid, the URL is added to `uniqueUrls` and `true` is returned. Otherwise, `false` is returned.
   *
   * @param url - URL to be checked.
   * @param urlCache - Record of URL metadata.
   * @param uniqueUrls - Set of unique URLs.
   *
   * @returns `true` if URL is unique and valid; otherwise, `false`.
   */
  const isUrlUniqueAndValid = (
    url: string,
    urlCache: Record<string, PromptItemDisplayData>,
    uniqueUrls: Set<string>,
  ): boolean => {
    if (!urlCache[url] || uniqueUrls.has(url)) {
      return false;
    }

    uniqueUrls.add(url);
    return true;
  };

  /**
   * Determines if the image and/or title from the provided URL metadata are unique.
   *
   * The function performs the following checks:
   * - If the image is non-null and exists in `uniqueImages`, return `false`.
   * - If the title is null, return `false`.
   * - If the title exists in `uniqueTitles`, return `false`.
   *
   * If the image is null, it only checks the uniqueness of the title. If both the
   * image and title are non-null, it checks the uniqueness of both.
   *
   * If the checks pass:
   * - The image (if non-null) is added to `uniqueImages`.
   * - The title is added to `uniqueTitles`.
   * The function then returns `true`.
   *
   * If any of the checks fail, the function returns `false`.
   *
   * @param urlMetadata - Metadata containing image and title of a URL.
   * @param uniqueImages - Set of unique images.
   * @param uniqueTitles - Set of unique titles.
   *
   * @returns `true` if the image (if non-null) and title are unique; otherwise, `false`.
   */
  const isImageAndTitleUnique = (
    urlMetadata: PromptItemDisplayData,
    uniqueImages: Set<string>,
    uniqueTitles: Set<string>,
  ): boolean => {
    const { image, title } = urlMetadata;

    if (!title) {
      return false;
    }

    if (image === null || image === undefined) {
      if (uniqueTitles.has(title)) {
        return false;
      }
      uniqueTitles.add(title);
      return true;
    }

    if (uniqueImages.has(image) || uniqueTitles.has(title)) {
      return false;
    }

    uniqueImages.add(image);
    uniqueTitles.add(title);
    return true;
  };

  /**
   * Creates a sidebar item using a prompt item, URL metadata, and a map of prompt terms.
   *
   * The function:
   * - Merges the URL metadata into a new sidebar item object.
   * - Maps the `promptKey` and corresponding term from the `promptTermsMap` to this object.
   * - Optionally, adds a unique letter if present in the `promptItem`.
   *
   * @param promptItem - Contains details like its key and an optional letter.
   * @param urlMetadata - Metadata for a URL, including details like title and image.
   * @param promptTermsMap - Maps prompt keys to their descriptive terms.
   *
   * @returns A constructed sidebar item.
   */
  const createSidebarItem = (
    promptItem: HighlightedPromptItem,
    urlMetadata: PromptItemDisplayData,
    promptTermsMap: Record<string, string>,
  ): ContentSideBarItem => {
    const sidebarItem: ContentSideBarItem = {
      ...urlMetadata,
      promptKey: promptItem.promptKey,
      promptTerm: promptTermsMap[promptItem.promptKey],
    };

    if ("letter" in promptItem && promptItem.letter) {
      sidebarItem.letter = promptItem.letter;
    }
    return sidebarItem;
  };

  /**
   * Transforms an array of `promptItems` into a list of sidebar items with associated metadata.
   *
   * The process is as follows for each `promptItem`:
   * 1. Sorts the `promptItems` based on their `letter` property if `pathname` includes `dataTypes.trend`.
   * 2. Validates the uniqueness and existence of each URL using `isUrlUniqueAndValid`.
   * 3. Ensures the associated image and title from `urlMetadata` are unique with `isImageAndTitleUnique`.
   * 4. If both checks (2 and 3) pass, it creates a new sidebar item using `createSidebarItem` and appends it to the list.
   *
   * @param promptItems - Array of prompt items to be processed.
   *
   * @returns An array of sidebar items enriched with associated metadata.
   */
  const getSidebarItems = (
    promptItems: HighlightedPromptItem[],
  ): ContentSideBarItem[] => {
    const sortedPromptItems = pathname.includes(dataTypes.trend)
      ? promptItems.toSorted((a, b) =>
          (a.letter || "").localeCompare(b.letter || ""),
        )
      : promptItems;

    const promptTermsMap = promptMapping(
      prompts.map((prompt: Prompt) => prompt.value),
    );
    const uniqueUrls: Set<string> = new Set();
    const uniqueImages: Set<string> = new Set();
    const uniqueTitles: Set<string> = new Set();
    const sidebarItems: ContentSideBarItem[] = [];

    sortedPromptItems.forEach((promptItem) => {
      promptItem.url.forEach((url) => {
        const urlMetadata = urlMetadataCache[url];

        if (
          isUrlUniqueAndValid(url, urlMetadataCache, uniqueUrls) &&
          isImageAndTitleUnique(urlMetadata, uniqueImages, uniqueTitles)
        ) {
          sidebarItems.push(
            createSidebarItem(promptItem, urlMetadata, promptTermsMap),
          );
        }
      });
    });

    return sidebarItems;
  };

  /**
   * Renders sidebar articles based on the `highlightedPromptItems`.
   *
   * This function performs the following steps:
   * 1. Extracts and processes prompt items from `highlightedPromptItems`.
   * 2. Converts these prompt items to a format suitable for the sidebar.
   * 3. Renders each prompt item as a `ContentSidebarItem` component with a unique key.
   *
   * The items undergo a filtering process based on the `selectedPrompts`. If no prompts are selected,
   * all the items from `highlightedPromptItems` will be displayed in the sidebar.
   *
   * @returns An array of `ContentSidebarItem` components. If `highlightedPromptItems` is empty,
   * an empty array is returned.
   */
  const renderSidebarArticles = () => {
    const sidebarItems = getSidebarItems(highlightedPromptItems);

    return sidebarItems
      .filter((item) => selectedPrompts.includes(item.promptKey))
      .map((item) => {
        const randomNumber = Math.floor(
          Math.random() * (Math.floor(10000) - Math.ceil(1)) + Math.ceil(1),
        );

        return (
          <ContentSidebarItem
            item={item}
            key={`${item.title}-${randomNumber}`}
            single={prompts.length === 1}
          />
        );
      });
  };

  /**
   * Clears the highlighted prompt items when the user navigates to a different page.
   * This is to prevent the sidebar from displaying the previous page's highlighted prompt items.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (highlightedPromptItems.length > 0) {
      setHighlightedPromptItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, prompts]);

  /**
   * Updates the `selectedPrompts` state whenever the `prompts` prop changes.
   */
  useEffect(() => {
    if (Array.isArray(prompts) && prompts.length > 0) {
      setSelectedPrompts(
        prompts.map(
          (prompt: Prompt, index: number) => `prompt${index + 1}`,
        ) as PromptKey[],
      );
    }
  }, [prompts]);

  return (
    <aside
      id="content-sidebar"
      className={clsx(
        "absolute border-0 border-solid border-gray-700 h-full top-0 right-0 overflow-x-hidden z-[1] transition-all",
        isContentSidebarOpen ? "border-l w-[285px]" : "w-[180px]",
      )}
    >
      <ContentSidebarHeader
        loading={loadingOpenGraph}
        prompts={prompts}
        selectedPrompts={selectedPrompts}
        updateSelectedPrompts={setSelectedPrompts}
      />
      <div
        ref={sidebarRef}
        className={clsx(
          "flex flex-col gap-y-14 h-content-sidebar overflow-y-auto py-10 px-6 transition-all",
          isContentSidebarOpen ? "delay-75 translate-x-0" : "translate-x-full",
        )}
      >
        {prompts.length === 0 && (
          <div className="px-7">
            <p className="text-gray-500 text-center text-sm">
              Input Topic for Content Drivers
            </p>
          </div>
        )}
        {prompts.length > 0 &&
          (loadingOpenGraph || loadingGeographic || loadingTrends) && (
            <ContentSidebarSkeleton />
          )}
        {prompts.length > 0 &&
          !loadingOpenGraph &&
          !loadingGeographic &&
          !loadingTrends &&
          Object.keys(urlMetadataCache).length > 0 &&
          highlightedPromptItems.length > 0 &&
          renderSidebarArticles()}
      </div>
    </aside>
  );
}
