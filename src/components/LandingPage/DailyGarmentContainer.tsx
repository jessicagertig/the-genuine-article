import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import DailyGarmentSkeleton from "src/components/LandingPage/DailyGarmentSkeleton";
import DailyGarment from "src/components/LandingPage/DailyGarment";
import { useDailyGarment } from "src/queryHooks/useGarments";

import useIntersectionObserver from "src/hooks/useIntersectionObserver";

interface HomeContentContainerProps {
  windowHeight: number;
  windowWidth: number;
}
export interface StylingVariables {
  isVeryShortScreen: boolean;
  isShortScreen: boolean;
  heightInVh: number;
  addPadding: boolean;
  show: boolean | undefined;
  ratio: number;
  mediumScreen: boolean;
}

const HomeContentContainer: React.FC<HomeContentContainerProps> = ({
  windowHeight,
  windowWidth,
}) => {
  const [addBottomMobileNavPadding, setaddBottomMobileNavPadding] =
    React.useState(false);
  const contentContainerRef = React.useRef<HTMLDivElement>(null!);
  const intersectionRef = React.useRef<HTMLDivElement>(null!);
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { data: garment } = useDailyGarment();

  const stringRatio = garment?.imageUrls?.ratio;

  const ratio = stringRatio ? parseFloat(stringRatio) : 1;
  const height = windowHeight ?? 100;
  console.log("height", height);
  const isVeryShortScreen = height <= 630;
  const isShortScreen = height <= 800;
  const heightInVh = height / (height * 0.01);

  React.useEffect(() => {
    // console.log("CONTENT REF", contentContainerRef);
    if (
      contentContainerRef?.current &&
      contentContainerRef.current.clientHeight
    ) {
      const hasBorders =
        contentContainerRef?.current?.clientHeight < windowHeight;
      const needsMargin = mediumScreen && !hasBorders;
      setaddBottomMobileNavPadding(needsMargin);
    } else {
      setaddBottomMobileNavPadding(false);
    }
  }, [contentContainerRef, mediumScreen, windowHeight]);

  /* FOR ANIMATIONS */

  const dataRef = useIntersectionObserver(intersectionRef, {
    freezeOnceVisible: true,
  });

  const show = dataRef?.isIntersecting;

  const styleVars: StylingVariables = {
    isVeryShortScreen,
    isShortScreen,
    heightInVh,
    addPadding: addBottomMobileNavPadding,
    show,
    ratio,
    mediumScreen,
  };
  console.log("STYLING VARIABLES", { styleVars });
  return (
    <Styled.Container styleVars={styleVars}>
      <Styled.SubContainer styleVars={styleVars} ref={contentContainerRef}>
        <Styled.ContentContainer
          styleVars={styleVars}
          addBottomMobileNavPadding={addBottomMobileNavPadding}
          ref={intersectionRef}
        >
          {!garment ? (
            null
            // <DailyGarmentSkeleton />
          ) : (
          <DailyGarment garment={garment} styleVars={styleVars} />
          )}
        </Styled.ContentContainer>
      </Styled.SubContainer>
    </Styled.Container>
  );
};

export default HomeContentContainer;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

type Props = { theme: Theme; styleVars: StylingVariables };

Styled.Container = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { heightInVh, isVeryShortScreen } = styleVars;
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
});

Styled.SubContainer = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { heightInVh, isVeryShortScreen } = styleVars;
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
});

Styled.ContentContainer = styled.div(({ theme, styleVars }: Props) => {
  const t = theme;
  const { addPadding, isShortScreen } = styleVars;
  return css`
    label: DailyGarment_HomeContentContainer;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    max-width: 1500px;
    padding-bottom: ${addPadding ? "64px" : "0px"};

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
