import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const StyledGarmentCard = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCard;
    ${t.rounded.md};
    width: 100%;
    height: 100%;
    color: ${t.color.blue_gray[200]};
    background-color: ${t.color.blue[700]};
    display: flex;
    flex-direction: column;

    ${t.mq.md} {
      ${t.m(4)};
      width: 296px;
      height: 456px;
    }
  `;
});

export const StyledGarmentCardText = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardMainText;
    display: flex;
    flex-direction: column;
    ${[t.ml(2), t.pl("px")]}

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
      line-height: 24px;
      font-weight: 700;
    }
  `;
});

export const StyledGarmentCardImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    ${[t.mx(2), t.mt(2), t.rounded.md]};
    width: 100%;
    height: 100%;
    background-color: ${t.color.white};
    display: block;

    ${t.mq.md} {
      width: 280px;
      height: 341px;
    }

    img {
      max-width: 100%;
    }
  `;
});
