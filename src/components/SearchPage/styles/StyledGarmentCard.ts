import styled from "@emotion/styled";
import { css } from "@emotion/react";


export const StyledGarmentCard = styled.div((props) => {
  const t = props.theme;
  return css`
    label: GarmentCard;
    ${[t.p(4), t.text.p]};
    width: 100%;
    height: 100%;
    color: ${t.color.blue_gray[200]};
    background-color: ${t.color.blue[700]};
    display: block;


    ${t.mq.md} {
      ${t.m(4)};
      width: 334px;
      height: 610px;  
    }

    span {
      color: ${t.color.white};
    }
  `;
}); 

export const StyledGarmentCardImage = styled.div((props) => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    ${t.mb(4)};
    width: 100%;
    height: 100%;
    background-color: ${t.color.white};
    display: block;

    ${t.mq.md} {
      width: 302px;
      height: 368px; 
    }
  `;
});
