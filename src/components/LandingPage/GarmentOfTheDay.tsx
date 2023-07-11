import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useDailyGarment } from "src/queryHooks/useGarments";

interface HomeContentProps {}

const HomeContent: React.FC<HomeContentProps> = () => {

  const { data: garment } = useDailyGarment();

  const imageUrl = garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";

  return (
    <Styled.HomeContentContainer>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.ImageSection>
        <Styled.DisplayedImage>
          <img
            src={imageUrl}
            alt={garment ? garment.garmentTitle : "garment"}
          />
        </Styled.DisplayedImage>
      </Styled.ImageSection>
    </Styled.HomeContentContainer>
  );
};

export default HomeContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.HomeContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 1000px;
  `;
});

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    justify-content: center;
    ${t.pb(6)}

    h2 {
      ${[t.pt(24)]}
      font-size: 1.75rem;
      color: #172a4f;
    }
  `;
});

Styled.ImageSection = styled.section(() => {
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.DisplayedImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    width: 100vw;
    min-height: 300px;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
      height: 609px;
    }

    ${t.mq.sm} {
      width: 60vw;
      height: auto;
    }

    ${t.mq.lg} {
      width: 40vw;
      height: auto;
    }

    img {
      width: 100vw;
      max-width: 480px;
      max-height: 575px;

      ${t.mq.xs} {
        width: 500px;
        height: 609px;
        object-fit: cover;
        max-width: 500px;
        max-height: 609px;
      }

      ${t.mq.sm} {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
  `;
});