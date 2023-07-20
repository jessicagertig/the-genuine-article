import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from "src/components/shared/NavBar";
import Main from "src/components/LandingPage/Main";
import GarmentOfTheDay from "src/components/LandingPage/GarmentOfTheDay";
// import Search from "src/components/SearchPage/Search";

import { useWindowSizeContext } from 'src/context/WindowSizeContext';

interface LandingPageProps {};

const LandingPage: React.FC<LandingPageProps> = props => {
  const { dimensions: { height, width }} = useWindowSizeContext();
  const scrollRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    console.log("REF", scrollRef)
  }, [scrollRef])

  return (
    <Styled.LandingPageContainer>
      <NavBar backgroundColor="white" />
      <Main scrollRef={scrollRef} windowHeight={height} />
      <Styled.RefContainer ref={scrollRef}>
        <GarmentOfTheDay windowHeight={height} windowWidth={width} />
      </Styled.RefContainer>
      {/* <Styled.SearchContainer>
        <Search />
      </Styled.SearchContainer> */}
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

Styled.RefContainer = styled.div`
  label: RefContainer;
  width: 100%;
  height: fit-content;
`
Styled.SearchContainer = styled.div`
  label: SearchContainer;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  margin: 20px;
`
