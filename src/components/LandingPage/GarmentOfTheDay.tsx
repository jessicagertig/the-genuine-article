import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useDailyGarment } from "src/queryHooks/useGarments";

interface HomeContentProps {
  windowHeight: number;
}

const HomeContent: React.FC<HomeContentProps> = ({ windowHeight }) => {

  const { data: garment } = useDailyGarment();

  const imageUrl = garment && garment.imageUrls ? garment.imageUrls.mainImageUrl : "";

  return (
    <Styled.HomeContentContainer height={windowHeight}>
      <Styled.ContentTitleContainer>
        <h2>Garment of the Day</h2>
      </Styled.ContentTitleContainer>
      <Styled.ImageSection>
        <Styled.DisplayedImage height={windowHeight}>
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

Styled.HomeContentContainer = styled.div((props: any) => {
  const heightInVh = props.height/(props.height * 0.01)
  return css`
    label: HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${heightInVh}vh;
  `;
});

Styled.ContentTitleContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: HomeContentContainer;
    display: flex;
    width: 100%;
    height: 90px;
    justify-content: center;
    ${t.py(8)}

    h2 {
      font-size: 1.75rem;
      color: #172a4f;
    }
  `;
});

Styled.ImageSection = styled.section(() => {
  return css`
    label: DailyGarment_ImageSection;
    display: flex;
    justify-content: center;
  `;
});

Styled.DisplayedImage = styled.div((props: any) => {
  const t = props.theme;
  const heightInVh = props.height/(props.height * 0.01)
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    width: auto;
    height: calc(${heightInVh}vh - 160px);
    flex-shrink: 1;

    img {
      width: auto;
      height: calc(${heightInVh}vh - 160px);

      ${t.mq.xs} {
        height: calc(${heightInVh}vh - 120px);
      }
    }

    ${t.mq.xs} {
      height: calc(${heightInVh}vh - 120px);
    }
  `;
});