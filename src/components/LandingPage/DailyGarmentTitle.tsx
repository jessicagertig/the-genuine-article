import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import { useTrail, animated } from "@react-spring/web";

import Divider from "src/components/shared/Divider";
import { StylingVariables } from "src/components/LandingPage/DailyGarment";

interface DailyGarmentTitleProps {
  stylevars: StylingVariables;
}

const DailyGarmentTitle: React.FC<DailyGarmentTitleProps> = ({ stylevars }) => {
  const enter = useTrail(stylevars.show ? 2 : 0, {
    from: {
      opacity: 0,
      transform: "translate3d(-100px,0px, 0)",
      width: "100%",
      color: "white",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0)",
      width: "100%",
      color: stylevars.show ? "#020b1c" : "white",
    },
    config: { duration: 500 },
  });

  return (
    <Styled.ContentTitleContainer stylevars={stylevars}>
      {enter.map((props, index) => (
        <animated.div key={index} style={{ ...props, width: "100%" }}>
          {index === 0 && <h2>Garment of the Day</h2>}
          {index === 1 && <Divider color="#020b1c" />}
        </animated.div>
      ))}
    </Styled.ContentTitleContainer>
  );
};

export default DailyGarmentTitle;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

type Props = { theme: Theme; stylevars: StylingVariables };

Styled.ContentTitleContainer = styled(animated.div)(
  ({ theme, stylevars }: Props) => {
    const t = theme;
    const { isShortScreen } = stylevars;
    return css`
      label: HomeContentContainer;
      display: flex;
      flex-direction: column;
      width: min(500px, 95vw, 100%);
      max-height: 48px;
      height: auto;
      justify-content: flex-end;
      align-items: flex-end;
      ${[t.mt(4), t.mb(4)]};

      ${t.mq.xs} {
        margin-bottom: ${isShortScreen ? "16px" : "20px"};
      }

      ${t.mq.sm} {
        margin-bottom: ${isShortScreen ? "16px" : "24px"};
      }

      ${t.mq.md} {
        height: ${isShortScreen ? "auto" : "64px"};
        margin-top: ${isShortScreen ? "2%" : "36px"};
        margin-bottom: ${isShortScreen ? "2%" : "36px"};
      }

      ${t.mq.xl} {
        width: 27%;
        height: 64px;
        margin-top: -224px;
      }

      ${t.mq.xxl} {
        width: 28%;
      }

      div {
        display: flex;
        justify-content: flex-end;
      }

      h2 {
        font-size: 1.375rem;
        line-height: 2.25rem;
        color: inherit;
        letter-spacing: 0.01rem;
        ${[t.pb(0)]};

        ${t.mq.md} {
          font-size: ${isShortScreen ? "1.375rem" : "1.75rem"};
        }

        ${t.mq.xl} {
          font-size: 1.75rem;
          ${[t.pl(4), t.pb(2)]};
        }
      }
    `;
  }
);
