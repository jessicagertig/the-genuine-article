import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const StyledGarmentCard = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCard;
    ${t.rounded.md};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    ${t.mq.sm} {
      ${t.m(4)};
      width: 296px;
      height: 444px;
    }
  `;
});

export const StyledGarmentCardText = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardMainText;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(0,0,0,.5);
    ${[t.px(3), t.mt(8)]}

    h6 {
      ${t.text.p}
      color: ${t.color.white};
      font-size: 24px;
      font-weight: 700;
      line-height: 48px;
    }

    p {
      color: ${t.color.white};
      font-size: 16px;
      line-height: 48px;
      font-weight: 700;
    }
  `;
});

export const StyledGarmentCardImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    ${[t.mx(0), t.mt(0), t.rounded.md]};
    width: 100%;
    height: 100%;
    background-color: ${t.color.white};
    display: block;
    
    ${t.mq.sm} {
      width: 296px;
      height: 341px;
    }

    img {
      ${t.rounded.md};
      max-width: 100%;
    }
  `;
});
