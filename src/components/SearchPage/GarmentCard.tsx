import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Skeleton from "@mui/material/Skeleton";

import { GarmentData } from "src/types";

interface GarmentCardProps {
  garment: GarmentData;
  loading: boolean;
  handleClick: (
    event: React.MouseEvent<HTMLDivElement>,
    garmentId: number
  ) => void;
}

const GarmentCard: React.FC<GarmentCardProps> = ({
  garment,
  handleClick,
  loading,
}) => {
  const url =
    garment && garment.imageUrls ? garment.imageUrls.displayUrl : undefined;

  return (
    <>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={296}
          height={444}
          sx={{
            bgcolor: "rgba(211, 217, 229, 0.9)",
            borderRadius: "8px",
            my: "32px",
          }}
        />
      ) : (
        <Styled.GarmentCard
          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            handleClick(event, garment?.id)
          }
        >
          <Styled.GarmentCardImage>
            <img src={url} alt={garment ? garment?.garmentTitle : "garment"} />
          </Styled.GarmentCardImage>
          <Styled.GarmentCardText>
            <h6>{garment?.garmentTitle}</h6>
            <p>c. {garment?.beginYear}</p>
          </Styled.GarmentCardText>
        </Styled.GarmentCard>
      )}
    </>
  );
};

export default GarmentCard;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentCard = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCard;
    ${t.rounded.md};
    width: 280px;
    min-height: 345px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    ${t.m(4)}

    ${t.mq.xxs} {
      width: 296px;
      height: 444px;
    }

    ${t.mq.sm} {
      max-width: 296px;
      max-height: 444px;
      width: calc(50% - 32px);
      height: calc((43.5vw - 32px) * 1.5);
    }

    ${t.mq.mdlg} {
      width: calc(33.33% - 32px);
      height: calc((30vw - 32px) * 1.5);
    }

    &:hover {
      cursor: pointer;
    }
  `;
});

Styled.GarmentCardText = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardMainText;
    display: flex;
    max-width: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    ${[t.px(3), t.mb(8)]}

    ${t.mq.xxs} {
      ${t.mb(0)}
    }

    h6 {
      ${t.text.p}
      color: ${t.color.white};
      font-size: 20px;
      font-weight: 500;
      line-height: 42px;
    }

    p {
      color: ${t.color.white};
      font-size: 16px;
      line-height: 42px;
      font-weight: 500;
    }
  `;
});

Styled.GarmentCardImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    width: 280px;
    height: 347px;
    display: block;

    ${t.mq.xxs} {
      width: 296px;
      height: 372px;
    }

    ${t.mq.sm} {
      max-width: 296px;
      max-height: 372px;
      height: calc(100% - 72px);
      width: 100%;
    }

    img {
      ${t.rounded.md};
      max-width: 100%;
    }
  `;
});
