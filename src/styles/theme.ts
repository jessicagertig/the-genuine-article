import { css, Theme } from "@emotion/react";

type Spacing = {[key: string | 'auto' | 'px' ]: string}

const color = {
  data: [
    "#fd7f6f", 
    "#7eb0d5", 
    "#b2e061", 
    "#bd7ebe", 
    "#ffb55a", 
    "#ffee65", 
    "#beb9db", 
    "#fdcce5", 
    "#8bd3c7",
    
  ],
  white: "#FFFFFF",
  gray: {
     50: "#FAFAFA",
    100: "#F4F4F4",
    200: "#E7E7E7",
    300: "#D5D5D5",
    400: "#A3A3A3",
    500: "#727272",
    600: "#555555",
    700: "#414141",
    800: "#292929",
    900: "#181818",
  },
  black: "#000000",
  blue: {
    100: "#2F579C",
    200: "#223F7C",
    300: "#1E3768",
    400: "#223F7C",
    500: "#133067"
  },
  red: {
    300: "#DA2929",
    400: "#C42121",
    500: "#831616"
  },
  blue_gray: {
    100: "#D3D9E5",
    200: "#AFBBCF",
    300: "#8FA0BC",
    400: "#899AB8",
    500: "#6A80A6",
    600: "#4C5F80",
    700: "#203C77",
    800: "#182A50"
  },
  pink: {
    200: "#FBE9EF",
    400: "#F0A6BD",
    600: "#EC79A9"
  } 
};

const spacing: Spacing = {
  "0": "0px",
  px: "1px",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  auto: "auto",
};

function spacingFromSize(size: Spacing) {
  let sizeString = size.toString();
  if (sizeString.charAt(0) === "-") {
    return `-${spacing[sizeString.substr(1)]}`;
  } else return spacing[sizeString];
}

const typeScale = {
  xxs: css`
    font-size: 0.75rem;
  `,
  xs: css`
  font-size: 0.825rem;
  `,
  sm: css`
    font-size: 0.875rem;
  `,
  base: css`
    font-size: 1rem;
  `,
  lg: css`
    font-size: 1.125rem;
  `,
  xl: css`
    font-size: 1.25rem;
  `,
  xxl: css`
    font-size: 1.5rem;
  `,
  xxxl: css`
    font-size: 1.875rem;
  `,
  xxxxl: css`
    font-size: 2rem;
  `,
};

const breakpoints: { [index: string]: number } = {
  md: 480,
  lg: 768,
  xl: 1024,
};

const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

const theme: Theme = {
    color,
    spacing,
    mq,
  
    // Size
    h: function(size: number) {
      return css`
        height: ${spacing[size.toString()]};
      `;
    },
    w: function(size: number) {
      return css`
        width: ${spacing[size.toString()]};
      `;
    },
  
    // Position
    l: function(size: Spacing) {
      return css`
        left: ${spacingFromSize(size)};
      `;
    },
    r: function(size: Spacing) {
      return css`
        right: ${spacingFromSize(size)};
      `;
    },
    t: function(size: Spacing) {
      return css`
        top: ${spacingFromSize(size)};
      `;
    },
    b: function(size: Spacing) {
      return css`
        bottom: ${spacingFromSize(size)};
      `;
    },
  
    // Margins
    m: function(size: Spacing) {
      return css`
        margin: ${spacingFromSize(size)};
      `;
    },
    ml: function(size: Spacing) {
      return css`
        margin-left: ${spacingFromSize(size)};
      `;
    },
    mr: function(size: Spacing) {
      return css`
        margin-right: ${spacingFromSize(size)};
      `;
    },
    mt: function(size: Spacing) {
      return css`
        margin-top: ${spacingFromSize(size)};
      `;
    },
    mb: function(size: Spacing) {
      return css`
        margin-bottom: ${spacingFromSize(size)};
      `;
    },
    mx: function(size: Spacing) {
      return css`
        margin-left: ${spacingFromSize(size)};
        margin-right: ${spacingFromSize(size)};
      `;
    },
    my: function(size: Spacing) {
      return css`
        margin-top: ${spacingFromSize(size)};
        margin-bottom: ${spacingFromSize(size)};
      `;
    },
  
    // Padding
    p: function(size: number) {
      return css`
        padding: ${spacing[size.toString()]};
      `;
    },
    pl: function(size: number) {
      return css`
        padding-left: ${spacing[size.toString()]};
      `;
    },
    pr: function(size: number) {
      return css`
        padding-right: ${spacing[size.toString()]};
      `;
    },
    pt: function(size: number) {
      return css`
        padding-top: ${spacing[size.toString()]};
      `;
    },
    pb: function(size: number) {
      return css`
        padding-bottom: ${spacing[size.toString()]};
      `;
    },
    px: function(size: number) {
      var sizeKey = size.toString();
      return css`
        padding-left: ${spacing[sizeKey]};
        padding-right: ${spacing[sizeKey]};
      `;
    },
    py: function(size: number) {
      var sizeKey = size.toString();
      return css`
        padding-top: ${spacing[sizeKey]};
        padding-bottom: ${spacing[sizeKey]};
      `;
    },

    text: {
      ...typeScale,
  
      // Font Weights
      normal: css`
        font-weight: 400;
      `,
      medium: css`
        font-weight: 500;
      `,
      semibold: css`
        font-weight: 600;
      `,
      bold: css`
        font-weight: 700;
      `,
      heavy: css`
        font-weight: 800;
      `,
      // Font Colors
      primary: css`
      color: ${color.black};
      `,
      secondary: css`
      color: ${color.blue[500]};
      `,
      // Headings
      h1: css`
        font-weight: 900;
        ${typeScale.xxxl};
      `,
      h2: css`
        font-weight: 800;
        ${typeScale.xxl};
      `,
      h3: css`
        font-weight: 700;
        ${typeScale.xl};
      `,
      h4: css`
        font-weight: 700;
        ${typeScale.lg};
      `,
      h5: css`
        font-weight: 700;
        ${typeScale.base};
      `,
      h6: css`
        font-weight: 700;
        ${typeScale.sm};
      `
  },

  rounded: {
    xs: css`
      border-radius: 0.25rem;
    `,
    sm: css`
      border-radius: 0.3125rem;
    `,
    md: css`
      border-radius: 0.4375rem;
    `,
  },
};

export default theme