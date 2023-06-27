import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const StyledGarmentCard = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCard;
    ${t.rounded.md};
    width: 296px;
    height: 444px; //true visual height of image
    display: flex;
    flex-direction: column;
    ${t.m(4)};
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

// image height is viaually full height of card
// but setting it to 340px allows the text to display as an overlay
// seems like a hack 
export const StyledGarmentCardImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    ${[t.mx(0), t.mt(0), t.rounded.md]};
    width: 296px;
    height: 340px;
    background-color: ${t.color.white};
    display: block;
    
    img {
      ${t.rounded.md};
      max-width: 100%;
    }
  `;
});
