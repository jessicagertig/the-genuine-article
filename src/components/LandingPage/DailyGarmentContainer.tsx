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
  const heightInVh = height / (height * 0.01);

  return (
    <Styled.Container
      isVeryShortScreen={isVeryShortScreen}
      heightInVh={heightInVh}
    >
      <>
        {!garment ? (
          <DailyGarmentSkeleton />
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

type Props = { theme: Theme; isVeryShortScreen: boolean; heightInVh: number };

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
    `;
  }
);
