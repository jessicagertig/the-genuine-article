import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PublicHeader from 'src/components/shared/PublicHeader';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Styled.LandingPageContainer>
      <PublicHeader
        titleText='The Genuine Article'
        descriptionText='A collection of images of original historical clothing from the 19th century '
      />
    </Styled.LandingPageContainer>
  );
};

export default LandingPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LandingPageContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: LandingPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
});