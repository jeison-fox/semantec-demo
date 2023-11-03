export {};

declare global {
  type SnackBarParams = {
    key: string;
    message: string;
    variant: "error" | "success" | "warning" | "info";
  };

  type SnackBarType = "geo" | "trends" | "meta";
}
