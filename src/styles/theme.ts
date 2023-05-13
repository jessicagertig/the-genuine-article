import { css, Theme } from "@emotion/react";

type Space = {[key: string | 'auto' | 'px' ]: string}

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
    500: "#133067",
    600: "#0D1F4C",
    700: "#172a4f",
  },
  red: {
    300: "#DA2929",
    400: "#C42121",
    500: "#831616"
  },
  blue_gray: {
    100: "#D3D9E5",
    200: "#BFC9D9",
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

const space: Space = {
  "0": "0px",
  px: "1px", // 1px
  "1": "0.25rem", // 4px
  "2": "0.5rem", // 8px
  "2.5": "0.625rem", // 10px
  "3": "0.75rem", // 12px
  "4": "1rem", // 16px
  "5": "1.25rem", // 20px
  "6": "1.5rem", // 24px
  "8": "2rem", // 32px
  "9": "2.25rem", // 36px
  "10": "2.5rem", // 40px
  "12": "3rem", // 48px
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

function spaceFromSize(size: Space) {
  let sizeString = size.toString();
  if (sizeString.charAt(0) === "-") {
    return `-${space[sizeString.substr(1)]}`;
  } else return space[sizeString];
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
    font-size: 1rem; // 16px
  `,
  lg: css`
    font-size: 1.125rem; // 18px
  `,
  xl: css`
    font-size: 1.375rem; // 22px
  `,
  xxl: css`
    font-size: 1.5rem; // 24px
  `,
  xxxl: css`
    font-size: 1.875rem; // 30px
  `,
  xxxxl: css`
    font-size: 2.25rem;
  `,
};

const breakpoints: { [index: string]: number } = {
  sm: 320,
  md: 480,
  lg: 640,
  xl: 768,
  xxl: 1024,
};

const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

const theme: Theme = {
    color,
    space,
    mq,
  
    // Size
    h: function(size: number) {
      return css`
        height: ${space[size.toString()]};
      `;
    },
    w: function(size: number) {
      return css`
        width: ${space[size.toString()]};
      `;
    },
  
    // Position
    l: function(size: Space) {
      return css`
        left: ${spaceFromSize(size)};
      `;
    },
    r: function(size: Space) {
      return css`
        right: ${spaceFromSize(size)};
      `;
    },
    t: function(size: Space) {
      return css`
        top: ${spaceFromSize(size)};
      `;
    },
    b: function(size: Space) {
      return css`
        bottom: ${spaceFromSize(size)};
      `;
    },
  
    // Margins
    m: function(size: Space) {
      return css`
        margin: ${spaceFromSize(size)};
      `;
    },
    ml: function(size: Space) {
      return css`
        margin-left: ${spaceFromSize(size)};
      `;
    },
    mr: function(size: Space) {
      return css`
        margin-right: ${spaceFromSize(size)};
      `;
    },
    mt: function(size: Space) {
      return css`
        margin-top: ${spaceFromSize(size)};
      `;
    },
    mb: function(size: Space) {
      return css`
        margin-bottom: ${spaceFromSize(size)};
      `;
    },
    mx: function(size: Space) {
      return css`
        margin-left: ${spaceFromSize(size)};
        margin-right: ${spaceFromSize(size)};
      `;
    },
    my: function(size: Space) {
      return css`
        margin-top: ${spaceFromSize(size)};
        margin-bottom: ${spaceFromSize(size)};
      `;
    },
  
    // Padding
    p: function(size: number) {
      return css`
        padding: ${space[size.toString()]};
      `;
    },
    pl: function(size: number) {
      return css`
        padding-left: ${space[size.toString()]};
      `;
    },
    pr: function(size: number) {
      return css`
        padding-right: ${space[size.toString()]};
      `;
    },
    pt: function(size: number) {
      return css`
        padding-top: ${space[size.toString()]};
      `;
    },
    pb: function(size: number) {
      return css`
        padding-bottom: ${space[size.toString()]};
      `;
    },
    px: function(size: number) {
      var sizeKey = size.toString();
      return css`
        padding-left: ${space[sizeKey]};
        padding-right: ${space[sizeKey]};
      `;
    },
    py: function(size: number) {
      var sizeKey = size.toString();
      return css`
        padding-top: ${space[sizeKey]};
        padding-bottom: ${space[sizeKey]};
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
        ${typeScale.xxxxl};
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
      `,
      p: css`
        font-weight: 400;
        ${typeScale.base};
      `,
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