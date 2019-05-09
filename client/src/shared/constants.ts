export const Size = {
  SMALL: "small" as "small",
  MEDIUM: "medium" as "medium",
  LARGE: "large" as "large"
};

export type Size = typeof Size[keyof typeof Size];
