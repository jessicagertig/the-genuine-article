import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from "src/components/shared/NavBar";
import Main from "src/components/LandingPage/Main";
import BottomContent from "src/components/LandingPage/BottomContent";
import Footer from "src/components/shared/Footer";
import DailyGarment from "src/components/LandingPage/DailyGarment";

import { useWindowSizeContext } from "src/context/WindowSizeContext";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = props => {
  const {
    dimensions: { height, width },
  } = useWindowSizeContext();
  const scrollRef = React.useRef<HTMLDivElement>(null!);

  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Styled.LandingPageContainer data-testid="landing-page-container" ref={pageContainerRef} >
      <NavBar backgroundColor="white" />
      <Main scrollRef={scrollRef} windowHeight={height} />
      <Styled.RefContainer ref={scrollRef}>
        <DailyGarment windowHeight={height} windowWidth={width} />
      </Styled.RefContainer>
      <BottomContent />
      <Footer scrollToTop={scrollToTop} dark={false} />
    </Styled.LandingPageContainer>
  );
};

export default LandingPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LandingPageContainer = styled.div((props) => {
  return css`
    label: LandingPageContainer;
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;

    
    & > :last-child {
      margin-top: auto;
    }
  `;
});

Styled.RefContainer = styled.div`
  label: RefContainer;
  width: 100%;
  height: fit-content;
`;