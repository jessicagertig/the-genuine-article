import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";
import ProgressiveImage from "src/components/shared/ProgressiveImage";

import { GarmentData } from "src/types";

type NavigationState =
  | {
      isSearch: boolean;
      searchParams: string;
    }
  | {
      pageNo: number;
    };

interface GarmentCardProps {
  garment: GarmentData;
  loading: boolean;
  navigationState: NavigationState;
}

const GarmentCard: React.FC<GarmentCardProps> = ({
  garment,
  navigationState,
  loading,
}) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const handleLoading = React.useCallback((loading: boolean) => {
    setImageLoading(loading);
  }, []);

  console.log("NAVIGATION STATE", navigationState);
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
          role="button"
          aria-label="Navigate to garment details"
          to={`/garments/${garment?.id}`}
          state={navigationState}
        >
          <Styled.GarmentCardImage isLoading={imageLoading}>
            <ProgressiveImage
              src={garment?.imageUrls?.displayUrl}
              alt={garment ? garment.garmentTitle : "garment"}
              placeholderSrc={garment?.imageUrls?.tinyDisplayUrl}
              isBackground={false}
              handleLoading={handleLoading}
            />
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

Styled.GarmentCard = styled(Link)(props => {
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
    background-color: rgba(211, 217, 229, 0.5);
    position: relative;

    ${t.mq.xxs} {
      width: 296px;
      height: 444px;
    }

    ${t.mq.sm} {
      width: min(calc(50% - 32px), 296px);
      height: min(calc((47vw - 32px) * 1.5), 444px);
    }

    ${t.mq.mdlg} {
      width: min(calc(33.33% - 32px), 296px);
      height: min(calc((31.33vw - 32px) * 1.5), 444px);
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
    z-index: 4;

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

Styled.GarmentCardImage = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: GarmentCardImage;
    width: 280px;
    height: 347px;
    display: block;
    ${t.rounded.md};

    ${t.mq.xxs} {
      width: 296px;
      height: 372px;
    }

    ${t.mq.sm} {
      height: min(calc(100% - 72px), 372px);
      width: min(100%, 296px);
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      ${t.rounded.md};
      backdrop-filter: ${props.isLoading ? "blur(4px)" : "blur(0px)"};
    }

    img {
      position: absolute;
      ${t.rounded.md};
      object-fit: fill;
      width: 100%;
      height: 100%;
    }
  `;
});
