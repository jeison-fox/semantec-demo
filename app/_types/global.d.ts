export {};

declare global {
  type ApiError = {
    message: string;
    statusCode: number;
  };

  type CaptionProps = {
    type: "trend" | "geographic";
  };

  type DataTypes = {
    trend: "trend";
    geographic: "geographic";
  };
}
