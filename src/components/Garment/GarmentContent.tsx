import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Button from "@mui/material/Button";

import { GarmentData } from "src/types";
import OutlinedButton from "src/components/shared/OutlinedButton";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

interface GarmentPageProps {
  garment: GarmentData | undefined;
  admin?: boolean;
}

const GarmentPage: React.FC<GarmentPageProps> = ({ garment, admin }) => {
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
            <Styled.InfoItem key={item.name}>
              <span>{item.name}</span>
              <p>{listToString}</p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem key={item.name}>
              <span>{item.name}</span>
              <a href={item.value} target="_blank" rel="noreferrer">
                {item.value}
              </a>
            </Styled.InfoItem>
          );
        } else {
          return (
            <Styled.InfoItem key={item.name}>
              <span>{item.name}</span>
              <p>{item.value}</p>
            </Styled.InfoItem>
          );
        }
      })
    : [];

  const onClickEditImages = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onClickDelete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Clicked!!!");
  };

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
        <Styled.ButtonContainer>
          {admin ? (
            <Button
              variant="contained"
              color="primary"
              onClick={event => onClickEditImages(event)}
            >
              Edit Images
            </Button>
          ) : null}
        </Styled.ButtonContainer>
      </Styled.ImagesSection>
      <Styled.InfoSection>
        <Styled.HeaderContainer>
        <Styled.InfoTitleContainer>
          <Styled.InfoTitle>Garment Information</Styled.InfoTitle>
        </Styled.InfoTitleContainer>
          <Styled.IconButtonContainer>
            {admin ? (
              <IconButton color="primary" onClick={event => onClickEdit(event)}>
                <BorderColorOutlinedIcon />
              </IconButton>
            ) : null}
          </Styled.IconButtonContainer>
        </Styled.HeaderContainer>
        <Styled.InfoContent>{itemNodes}</Styled.InfoContent>
      </Styled.InfoSection>
      <Styled.DeleteButtonContainer>
        {admin ? (
          <OutlinedButton color="error" onClick={onClickDelete}>Delete Garment</OutlinedButton>
        ) : null}
      </Styled.DeleteButtonContainer>
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

Styled.DisplayedImage = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_DisplayedImage;
    background-color: rgba(211, 217, 229, 0.5);
    display: flex;
    width: 100vw;
    height: 400px;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
      height: 609px;
    }

    img {
        width: 100vw;
        
        ${t.mq.xs} {
          width: 500px;
          height: 609px;
        }
    }
  `;
});

Styled.ThumbGallery = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_ImagesGallery;
    ${t.m(4)}
    width: 320px;
    height: 64px;
    display: flex;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
    }
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
    ${[t.p(0), t.mb(6)]}
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${t.color.blue_gray[700]};
    border-radius: 8px;
    background-color: rgba(211, 217, 229, 0.2);

    ${t.mq.md} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
      ${[t.p(4)]}
    }
  `;
});

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer
  width: 100%;
`

Styled.InfoTitleContainer = styled.div(() => {
  return css`
    label: Garment_InfoHeader;
    display: flex;
    justify-content: center;
    margin-left: 20%;
    width: 60%;
  `;
});

Styled.InfoTitle = styled.h2(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoTitle;
    ${[t.pt(2)]}
    font-family: "bellota text";
    color: ${t.color.blue_gray[700]};
    font-size: 1.25rem;
    text-transform: uppercase;
    text-align: center;
  `;
});

Styled.IconButtonContainer = styled.div(() => {
  return css`
    label: Garment_InfoButton;
    display: flex;
    justify-content: flex-end;
    width: 20%;
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
    width: 100%;
    color: ${t.color.blue_gray[700]};
    font-size: 1rem;
    font-family: "bellota text";

    span {
      font-weight: 800;
    }

    a {
      overflow-wrap: break-word;
      &:hover {
        text-decoration: underline;
      }
    }
  `;
});

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_EditButtonContainer
    ${[t.mx(1), t.mt(1), t.mb(6)]}
    display: flex;
    justify-content: center;
    align-items: center;
  `;
});


Styled.DeleteButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_EditButtonContainer
    ${[t.mt(2), t.mb(40)]}
    display: flex;
    justify-content: center;
    align-items: center;
  `;
});
