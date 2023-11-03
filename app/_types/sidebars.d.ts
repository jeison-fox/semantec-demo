export {};

declare global {
  type ContentSideBarItem = PromptItemDisplayData & {
    letter?: string;
    promptKey: PromptKey;
    promptTerm: string;
  };

  type ContentSideBarItemProps = {
    item: ContentSideBarItem;
    single: boolean;
  };
}
