export {};

declare global {
  type OpengraphResult = PromptItemDisplayData[];

  type OpengraphResponse = [OpengraphResult | undefined, ApiError | undefined];
}
