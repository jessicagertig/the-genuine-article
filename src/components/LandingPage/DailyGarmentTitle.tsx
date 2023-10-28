import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import Divider from "src/components/shared/Divider";
import { StyleProps } from "src/components/LandingPage/DailyGarment"

interface DailyGarmentTitleProps {
  styles: StyleProps;
}

const DailyGarmentTitle: React.FC<DailyGarmentTitleProps> = ({ styles }) => {
  console.log("DailyGarmentTitle  [render props]", styles)
  return (
    <Styled.ContentTitleContainer styles={styles}>
      <h2>Garment of the Day</h2>
      <Divider color="#020b1c" />
    </Styled.ContentTitleContainer>
  );
};

export default DailyGarmentTitle;
// Styled Components
// =======================================================
let Styled: any;
Styled = {};

interface Props {
  theme: Theme;
  styles: StyleProps;
}

Styled.ContentTitleContainer = styled.div(({ theme, styles }: Props) => {
  const t = theme;
  const { shortContent } = styles;
  return css`
    label: DailyGarmentTitleContainer;
    display: flex;
    flex-direction: column;
    width: min(500px, 95vw, 100%);
    max-height: 48px;
    height: auto;
    justify-content: flex-end;
    align-items: flex-end;
    ${[t.mt(4), t.mb(4)]};

    ${t.mq.xs} {
      margin-bottom: ${shortContent ? "16px" : "20px"};
    }

    ${t.mq.sm} {
      margin-bottom: ${shortContent ? "16px" : "24px"};
    }

    ${t.mq.md} {
      height: ${shortContent ? "auto" : "64px"};
      margin-top: ${shortContent ? "2%" : "36px"};
      margin-bottom: ${shortContent ? "2%" : "36px"};
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
        font-size: ${shortContent ? "1.375rem" : "1.75rem"};
      }

      ${t.mq.xl} {
        font-size: 1.75rem;
        ${[t.pl(4), t.pb(2)]};
      }
    }
  `;
});
