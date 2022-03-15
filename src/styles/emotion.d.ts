import '@emotion/react'

type SpacingKeys = string | 'auto' | 'px' 

declare module '@emotion/react' {
  export interface Theme {
    b: Function;
    color: {
      data: string[], 
      white: string, 
      gray: {[key: number]: string}, 
      black: string, blue: {[key: number]: string}, 
      red: {[key: number]: string}, 
      blue_gray: {[key: number]: string}, 
      pink: {[key: number]: string}
    };
    h: Function;
    l: Function;
    m: Function;
    mb: Function;
    ml: Function;
    mq: {[key: string]: string};
    mr: Function;
    mt: Function;
    mx: Function;
    my: Function;
    p: Function;
    pb: Function;
    pl: Function;
    pr: Function;
    pt: Function;
    px: Function;
    py: Function;
    r: Function;
    rounded: {};
    spacing:{[key: SpacingKeys]: string}
    t: Function;
    text: {};
    w: Function;
      }
    }
