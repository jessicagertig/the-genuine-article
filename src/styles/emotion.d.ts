import '@emotion/react'
import { SerializedStyles } from '@emotion/react';
//currently not in use

type SpacingKeys = string | 'auto' | 'px' 
type RoundedKeys = 'xs' | 'sm' | 'md'
type TextSizeKeys = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl'
type TextWeightKeys = 'normal' | 'medium' | 'semibold' | 'bold' | 'heavy'
type TextColorKeys = 'primary' | 'secondary'
type TextHeadingKeys = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
type TextKeys = TextSizeKeys | TextWeightKeys | TextColorKeys | TextHeadingKeys 

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
    rounded: {[key in RoundedKeys ]: SerializedStyles};
    space:{[key: SpacingKeys]: string}
    t: Function;
    text: {[key in TextKeys]: SerializedStyles};
    w: Function;
      }
    }
