import { css, Theme } from "@emotion/react";

type Space = { [key: string | "auto" | "px"]: string };

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
    100: "#FAFAFA",
    200: "#AFBBCF",
  },
  black: "#000000",
  blue: {
    100: "#223F7C", //primary light
    400: "#172a4f", //primary dark
    700: "#020b1c", //primary main
  },
  red: {
    300: "#DA2929", //error light
    400: "#C42121", //error main
    500: "#831616", //error dark
  },
  blue_gray: {
    100: "#D3D9E5", // nav background- info light
    200: "#BFC9D9", // secondary text - info light
    400: "#899AB8", //form text and underline info main
    600: "#4C5F80", // info dark
    700: "#203C77",
  },
  pink: {
    200: "#FBE9EF", // secondary light
    400: "#F0A6BD", // secondary main
    600: "#EC79A9", // secondary dark
  },
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
  "7": "1.75rem", //28px
  "8": "2rem", // 32px
  "9": "2.25rem", // 36px
  "10": "2.5rem", // 40px
  "12": "3rem", // 48px
  "16": "4rem", // 64px
  "18": "4.5rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "40": "10rem", // 160px
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
  xxs: 320,
  xs: 480,
  sm: 640,
  md: 768,
  mdlg: 950,
  lg: 1024,
  xl: 1200,
  gxl: 1445,
  xxl: 1600,
};

const mq = Object.keys(breakpoints)
  .map(key => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

const theme: Theme = {
  color,
  space,
  mq,

  // Size
  h: function (size: number) {
    return css`
      height: ${space[size.toString()]};
    `;
  },
  w: function (size: number) {
    return css`
      width: ${space[size.toString()]};
    `;
  },

  // Position
  l: function (size: Space) {
    return css`
      left: ${spaceFromSize(size)};
    `;
  },
  r: function (size: Space) {
    return css`
      right: ${spaceFromSize(size)};
    `;
  },
  t: function (size: Space) {
    return css`
      top: ${spaceFromSize(size)};
    `;
  },
  b: function (size: Space) {
    return css`
      bottom: ${spaceFromSize(size)};
    `;
  },

  // Margins
  m: function (size: Space) {
    return css`
      margin: ${spaceFromSize(size)};
    `;
  },
  ml: function (size: Space) {
    return css`
      margin-left: ${spaceFromSize(size)};
    `;
  },
  mr: function (size: Space) {
    return css`
      margin-right: ${spaceFromSize(size)};
    `;
  },
  mt: function (size: Space) {
    return css`
      margin-top: ${spaceFromSize(size)};
    `;
  },
  mb: function (size: Space) {
    return css`
      margin-bottom: ${spaceFromSize(size)};
    `;
  },
  mx: function (size: Space) {
    return css`
      margin-left: ${spaceFromSize(size)};
      margin-right: ${spaceFromSize(size)};
    `;
  },
  my: function (size: Space) {
    return css`
      margin-top: ${spaceFromSize(size)};
      margin-bottom: ${spaceFromSize(size)};
    `;
  },

  // Padding
  p: function (size: number) {
    return css`
      padding: ${space[size.toString()]};
    `;
  },
  pl: function (size: number) {
    return css`
      padding-left: ${space[size.toString()]};
    `;
  },
  pr: function (size: number) {
    return css`
      padding-right: ${space[size.toString()]};
    `;
  },
  pt: function (size: number) {
    return css`
      padding-top: ${space[size.toString()]};
    `;
  },
  pb: function (size: number) {
    return css`
      padding-bottom: ${space[size.toString()]};
    `;
  },
  px: function (size: number) {
    var sizeKey = size.toString();
    return css`
      padding-left: ${space[sizeKey]};
      padding-right: ${space[sizeKey]};
    `;
  },
  py: function (size: number) {
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
      color: ${color.blue[400]};
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
      border-radius: 0.5rem;
    `,
  },
};

export default theme;
