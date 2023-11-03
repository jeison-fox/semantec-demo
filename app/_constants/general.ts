export const dataTypes: DataTypes = {
  trend: "trend",
  geographic: "geographic",
};

export const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://semantec-demo.vercel.app";

export const loadingMessages: LoadingMessages = {
  trend: {
    empty: "Input Topic for Trends",
    loading: "Loading Data...",
  },
  geographic: {
    empty: "Input Topic for Geographic Data",
    loading: "Loading Map...",
  },
};

export const mapSources = {
  regions: `${domain}/geojson/regions.geojson`,
  planning_areas: `${domain}/geojson/planning_areas.geojson`,
};

export const promptKeys: PromptKey[] = [
  "prompt1",
  "prompt2",
  "prompt3",
  "prompt4",
];

export const snackbarConfig: Record<SnackBarType, SnackBarParams> = {
  geo: {
    key: "geo-error",
    message: "An error occurred fetching geographic data",
    variant: "error",
  },
  trends: {
    key: "trends-error",
    message: "An error occurred fetching trends data",
    variant: "error",
  },
  meta: {
    key: "meta-error",
    message: "An error occurred fetching metadata",
    variant: "error",
  },
};
