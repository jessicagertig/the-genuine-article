import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { GarmentData } from "src/types";

interface GarmentPageProps {
  garment: GarmentData | undefined;
}

const GarmentPage: React.FC<GarmentPageProps> = ({ garment }) => {
  type Item = {
    name: string;
    value: any;
  };

  const items: Item[] = [
    { name: "Title", value: garment?.garmentTitle },
    { name: "Date", value: garment?.beginYear },
    { name: "Decade", value: garment?.decade },
    { name: "Culture/Country", value: garment?.cultureCountry },
    { name: "Materials", value: garment?.materials },
    { name: "Colors", value: garment?.colors },
    { name: "Museum/Collection", value: garment?.collection },
    { name: "Link", value: garment?.collectionUrl },
    { name: "Designer/Maker", value: garment?.creator },
    { name: "Credit Line/Source", value: garment?.source },
    { name: "Collection No.", value: garment?.itemCollectionNo },
    { name: "Description", value: garment?.description },
  ];

  const itemNodes: JSX.Element[] = garment
    ? items.map(item => {
        if (item.name === "Colors" || item.name === "Materials") {
          const list = item ? item.value : [];
          const listToString = list.length > 0 ? list.join(", ") : "";
          return (
            <Styled.InfoItem>
              <span>{item.name}</span>
              <p>{listToString}</p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem>
              <span>{item.name}</span>
              <a href={item.value} target="_blank" rel="noreferrer">
                {item.value}
              </a>
            </Styled.InfoItem>
          );
        } else {
          return (
            <Styled.InfoItem>
              <span>{item.name}</span>
              <p>{item.value}</p>
            </Styled.InfoItem>
          );
        }
      })
    : [];

  return (
    <Styled.GarmentContainer>
      <Styled.ImagesSection>
        <Styled.DisplayedImage>
          <img
            src={garment?.imageUrls?.largeUrl}
            alt={garment ? garment.garmentTitle : "garment"}
          />
        </Styled.DisplayedImage>
        <Styled.ThumbGallery></Styled.ThumbGallery>
      </Styled.ImagesSection>
      <Styled.InfoSection>
        <Styled.InfoTitle>Garment Information</Styled.InfoTitle>
        <Styled.InfoContent>{itemNodes}</Styled.InfoContent>
        <Styled.EditButtonContainer></Styled.EditButtonContainer>
      </Styled.InfoSection>
    </Styled.GarmentContainer>
  );
};

export default GarmentPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentContainer = styled.div(() => {
  return css`
    label: Garment_Container;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.ImagesSection = styled.section(() => {
  return css`
    label: Garment_ImagesSection;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.DisplayedImage = styled.div(() => {
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    width: 500px;
    height: 609px;
    flex-shrink: 1;
  `;
});

Styled.ThumbGallery = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_ImagesGallery;
    ${t.m(4)}
    width: 500px;
    height: 64px;
    display: flex;
    flex-shrink: 1;
  `;
});

Styled.ThumbImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_ThumbImage;
    ${t.pt(1)}
    width: 64px;
    height: 64px;
    margin-right: 23px;
    background-color: rgba(211, 217, 229, 0.5);

    &:last-of-type {
      margin-right: 0px;
    }
  `;
});

Styled.InfoSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoSection;
    ${[t.p(4)]}
    margin: 2%;
    width: 96%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${t.color.blue_gray[700]};
    border-radius: 8px;
    background-color: rgba(211, 217, 229, 0.2);

    ${t.mq.md} {
      margin: 2% 6%;
      width: 88%;
    }
  `;
});

Styled.InfoTitle = styled.h2(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoTitle;
    font-family: "bellota text";
    color: ${t.color.blue_gray[700]};
    font-size: 1.25rem;
    text-transform: uppercase;
    text-align: center;
  `;
});

Styled.InfoContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoContent;
    ${t.pt(1)}
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
});

Styled.InfoItem = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoItem;
    ${[t.p(2), t.mb(1)]}
    display: flex;
    flex-direction: column;
    color: ${t.color.blue_gray[700]};
    font-size: 1rem;
    font-family: "bellota text";

    span {
      font-weight: 800;
    }

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  `;
});

Styled.EditButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_EditButtonContainer
    ${t.m(1)}
    display: flex;
    justify-content: center;
    align-items: center;
  `;
});
