import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Header from "src/components/LandingPage/Header";
import GarmentOfTheDay from "src/components/LandingPage/GarmentOfTheDay";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Styled.LandingPageContainer>
      <Header />
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
    display: flex;
    flex-direction: column;
  `;
});
