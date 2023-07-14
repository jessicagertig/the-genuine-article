import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useScroll, animated, useSpring } from "@react-spring/web";

import NavBar from "src/components/shared/NavBar";
import Main from "src/components/LandingPage/Main";
import GarmentOfTheDay from "src/components/LandingPage/GarmentOfTheDay";

type Props = {};

const LandingPage = (props: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null!);

  // const PAGE_COUNT = 4;

  // const [textStyles, textApi] = useSpring(() => ({
  //   y: "100%",
  // }));

  // const { scrollYProgress } = useScroll({
  //   container: containerRef,
  //   onChange: ({ value: { scrollYProgress } }) => {
  //     if (scrollYProgress > 0.7) {
  //       textApi.start({ y: "0" });
  //     } else {
  //       textApi.start({ y: "100%" });
  //     }
  //   },
  //   default: {
  //     immediate: true,
  //   },
  // });

  return (
    <Styled.LandingPageContainer ref={containerRef}>
      <NavBar backgroundColor="white" />
      <Main />
      
      <GarmentOfTheDay />
    </Styled.LandingPageContainer>
  );
};

export default LandingPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LandingPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LandingPageContainer;
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;
  `;
});

/* whole page scaffolding 
<main>
  <div class="mod mod-whole-browser fadable js-100vh js-clickable-module-parent">(flex)
    <div class="com-media"></div>//background image
    <div class="com content"></div> //the text overlay
    <div class="scroll-teaser"></div>//the scroll teaser - also an overlay
  </div>
</main>

.main {
    z-index: 1;
}

.main {
    background-color: #fff;
    position: relative;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
main {
    display: block;
}

*/

/*

.mod-whole-browser {
    align-items: center;
    display: flex;
    height: 100vh;
    position: relative;
}

.fadable {
    opacity: 1;
    transition-duration: 500ms;
    transition-property: opacity;
}

*/
//background top level div
/*
.mod-whole-browser .com-media {
    z-index: 1;
}

.com-media {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
}

//end top level div
*/

/*
background image styles:
NOTE: use JS to swap src image (for size) based on Media Queries or Screen Size

element.style {
    background-image: url(https://s3.us-east-1.amazonaws.com/pem-org/images/modules/browser-width/_width1800/hocollBGfash_001aa.jpg);
}
.no-touchevents .com-media-image {
    background-attachment: fixed;
}
.com-media-image {
    background-position: center top;
    background-size: cover;
    display: block;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
:root {
    --swiper-navigation-size: 30px;
  }

*/


//content (text) first level div
/* 
.main > :first-child .com-content {
    margin-top: 76px;
}
.mod-whole-browser .com-content {
    z-index: 2;
}
.com-content {
    position: relative;
    width: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}

user agent stylesheet
div {
    display: block;
}
*/

/* 
Content scaffolding

<div class="container">
  <div data-layout="module"  dat-layout-options="gutters wrap-items">(flex)
    <div data-layout="module__item" data-layout-width="one-whole c-three-quareters l-two-thirds">
      <div class="copy-block copy-block--light-text">
        <h6 class="js-fadable-content" style="opacity: 1;">
        "Explore Art"
        <span class="category-title">\\ Collection</span>
        </h6>
        <h1 class="js-fadbale-content" style="opacity: 1">Fashion & Textiles</h1>
      </div>
    </div>
  </div>
</div>


@media only screen and (min-width: 360px)
.container {
    padding-left: 50px;
    padding-right: 50px;
}

.container {
    min-width: 20rem;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
div {
    display: block;
}

_____

[data-layout-options~=wrap-items] {
    flex-wrap: wrap;
}

[data-layout-options~=gutters] {
    margin-left: -10px;
    margin-top: -50px;
    width: calc(100% + 10px);
}
[data-layout~=module] {
    display: flex;
    width: 100%;
}
*, *:before, *:after {
    box-sizing: inherit;
}

____

[data-layout-options~=gutters] > * {
    padding-left: 10px;
    padding-top: 50px;
}
[data-layout-width~=one-whole], [data-layout-width~=two-halves], [data-layout-width~=three-thirds], [data-layout-width~=four-quarters], [data-layout-width~=five-fifths] {
    width: 100%;
}

[data-layout-width] {
    flex: none;
}
[data-layout~=module__item] {
    flex: 1;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
div {
    display: block;
}

_____
.copy-block--light-text {
    color: #fff;
}

.copy-block {
    font-size: 1.1375rem;
    line-height: 1.6153846154;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
div {
    display: block;
}

___

element.style {
    opacity: 1;
}
.copy-block h6 {
    font-size: 0.94rem;
    font-weight: 900;
    letter-spacing: 2.2px;
    line-height: 1.4960106383;
    margin-bottom: 20px;
    text-transform: uppercase;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: inherit;
}
h1, h2, h3, h4, h5, h6, p, ul, ol, li, dl, dt, dd, blockquote, pre, figure, figcaption {
    font-size: inherit;
    line-height: 1;
    margin: 0;
    padding: 0;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
h6 {
    display: block;
    font-size: 0.67em;
    margin-block-start: 2.33em;
    margin-block-end: 2.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.copy-block--light-text {
    color: #fff;
}

*/

/*

//scroll teaser top level div
.scroll-teaser {
    bottom: 30px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
}

.scroll-teaser {
    z-index: 2;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
div {
    display: block;
}

*/

/*
scroll trigger teaser styles:

<div class="scroll-teaser">
  <button class="bttn-strip scroll-teaser__trigger js-scroll-teaser__trigger">
    <span>
      <span class="visuallyhidden">Scroll Down</span> (accessibility?)
    </span>
  </button>
</div>

_____
.btn-strip:hover, .btn-strip:focus {
    color: #e02d00;
    cursor: pointer;
}
.scroll-teaser__trigger {
    border: 2px solid rgba(255, 255, 255, 0.75);
    border-radius: 50%;
    display: block;
    height: 75px;
    position: relative;
    width: 75px;
}
.btn-strip {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
    color: #6a5e5e;
    padding: 0;
    text-align: left;
}
button, select {
    text-transform: none;
}
button, input, select {
    overflow: visible;
}
button, input, select, textarea {
    font: inherit;
    margin: 0;
}
*, *:before, *:after {
    box-sizing: inherit;
}
user agent stylesheet
button {
    letter-spacing: normal;
    align-items: flex-start;
}


__________

scroll-teaser__trigger > span {
    -webkit-animation: bounceTeaser 0.75s infinite;
    animation: bounceTeaser 0.75s infinite;
    border: 3px solid rgba(255, 255, 255, 0.75);
    border-top: none;
    border-left: none;
    display: block;
    height: 21px;
    margin-left: auto;
    margin-right: auto;
    transform: rotate(45deg);
    width: 21px;
}

*, *:before, *:after {
    box-sizing: inherit;
}
.btn-strip:hover, .btn-strip:focus {
    color: #e02d00;
    cursor: pointer;
}
.btn-strip {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
    color: #6a5e5e;
    padding: 0;
    text-align: left;
}


_______

visuallyhidden, .mod-whats-on__selector-filters ul [type=radio] {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}
*/
