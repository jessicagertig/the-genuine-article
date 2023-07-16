import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from "src/components/shared/NavBar";
import Main from "src/components/LandingPage/Main";
import GarmentOfTheDay from "src/components/LandingPage/GarmentOfTheDay";

type Props = {};

const LandingPage = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    console.log("REF", scrollRef)
  }, [scrollRef])

  return (
    <Styled.LandingPageContainer>
      <NavBar backgroundColor="white" />
      <Main scrollRef={scrollRef} />
      <Styled.RefContainer ref={scrollRef}>
        <GarmentOfTheDay />
      </Styled.RefContainer>
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
