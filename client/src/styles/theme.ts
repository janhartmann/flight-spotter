export interface IThemeColors {
  [index: string]: string;
}
export interface ITheme {
  colors: {
    background: string;
    text: string;
    headings: string;
    white: string;
    dark: IThemeColors;
    gray: IThemeColors;
    lightGray: IThemeColors;
    success: IThemeColors;
    warning: IThemeColors;
    danger: IThemeColors;
  };
  layout: {
    borderRadius: number;
    gutter: number;
    boxShadow: string;
    breakpoints: {
      small: string;
      medium: string;
      large: string;
    };
  };
  fonts: {
    primary: string;
  };
}

export const DEFAULT_THEME: ITheme = {
  colors: {
    background: "#10161A",
    text: "#F5F8FA",
    headings: "#FFFFFF",
    white: "#FFFFFF",
    dark: {
      [1]: "#182026",
      [2]: "#202B33",
      [3]: "#293742",
      [4]: "#30404D",
      [5]: "#394B59"
    },
    gray: {
      [1]: "#5C7080",
      [2]: "#738694",
      [3]: "#8A9BA8",
      [4]: "#A7B6C2",
      [5]: "#BFCCD6"
    },
    lightGray: {
      [1]: "#CED9E0",
      [2]: "#D8E1E8",
      [3]: "#E1E8ED",
      [4]: "#EBF1F5",
      [5]: "#F5F8FA"
    },
    success: {
      [1]: "#0A6640",
      [2]: "#0D8050",
      [3]: "#0F9960",
      [4]: "#15B371",
      [5]: "#3DCC91"
    },
    warning: {
      [1]: "#A66321",
      [2]: "#BF7326",
      [3]: "#D9822B",
      [4]: "#F29D49",
      [5]: "#FFB366"
    },
    danger: {
      [1]: "#A82A2A",
      [2]: "#C23030",
      [3]: "#DB3737",
      [4]: "#F55656",
      [5]: "#FF7373"
    }
  },
  layout: {
    borderRadius: 4,
    gutter: 15,
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
    breakpoints: {
      small: "@media (min-width: 480px)",
      medium: "@media (min-width: 768px)",
      large: "@media (min-width: 1200px)"
    }
  },
  fonts: {
    primary: "'Open Sans', sans-serif"
  }
};
