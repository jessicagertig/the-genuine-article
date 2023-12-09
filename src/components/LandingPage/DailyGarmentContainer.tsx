import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import DailyGarmentSkeleton from "src/components/LandingPage/DailyGarmentSkeleton";
import DailyGarment from "src/components/LandingPage/DailyGarment";
import { useDailyGarment } from "src/queryHooks/useGarments";

interface HomeContentContainerProps {
  windowHeight: number;
  windowWidth: number;
}

const HomeContentContainer: React.FC<HomeContentContainerProps> = ({
  windowHeight,
  windowWidth,
}) => {
  const { data: garment } = useDailyGarment();

  const height = windowHeight ?? 100;
  const isVeryShortScreen = height <= 630;
  const isShortScreen = height <= 800;
  const heightInVh = height / (height * 0.01);

  return (
    <Styled.Container
      isVeryShortScreen={isVeryShortScreen}
      heightInVh={heightInVh}
    >
      <>
        {!garment ? (
          <Styled.SubContainer
            isVeryShortScreen={isVeryShortScreen}
            heightInVh={heightInVh}
          >
            <Styled.ContentContainer isShortScreen={isShortScreen}>
              <DailyGarmentSkeleton />
            </Styled.ContentContainer>
          </Styled.SubContainer>
        ) : (
          <DailyGarment
            windowHeight={windowHeight}
            windowWidth={windowWidth}
            garment={garment}
          />
        )}
      </>
    </Styled.Container>
  );
};

export default HomeContentContainer;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

type Props = { theme: Theme; isVeryShortScreen: boolean; isShortScreen: boolean, heightInVh: number };

Styled.Container = styled.div(
  ({ theme, heightInVh, isVeryShortScreen }: Props) => {
    const t = theme;
    return css`
      label: DailyGarment_Container;
      display: flex;
      width: 100%;
      height: ${heightInVh}vh;
      align-items: center;
      justify-content: center;
      background-color: #020b1c;

      ${t.mq.md} {
        min-height: ${isVeryShortScreen ? "630px" : "unset"};
      }

      ${t.mq.xl} {
        background-color: white;
      }
    `;
  }
);

Styled.SubContainer = styled.div(
  ({ theme, heightInVh, isVeryShortScreen }: Props) => {
    const t = theme;
    return css`
      label: DailyGarment_SubContainer;
      display: flex;
      width: 100%;
      min-height: min(${heightInVh}vh, 800px);
      align-items: center;
      justify-content: center;
      background-color: white;

      ${t.mq.md} {
        min-height: ${isVeryShortScreen
          ? "630px"
          : `min(${heightInVh}vh, 800px)`};
      }

      ${t.mq.xl} {
        min-height: min(${heightInVh}vh, 800px);
      }
    `;
  }
);

Styled.ContentContainer = styled.div(({ theme, isShortScreen }: Props)=> {
  const t = theme;
  
  return css`
    label: DailyGarment_HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    max-width: 1500px;

    ${t.mq.md} {
      height: ${isShortScreen ? "100%" : "94%"};
      justify-content: ${isShortScreen ? "space-between" : "flex-start"};
      ${t.pb(0)};
    }

    ${t.mq.xl} {
      height: 100%;
      padding-right: 2%;
      padding-left: 2%;
      flex-direction: row;
      justify-content: center;
    }

    ${t.mq.gxl} {
      padding-right: 5%;
      padding-left: 5%;
    }
  `;
});