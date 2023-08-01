import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useNavigate } from "react-router-dom";

import { GarmentData } from "src/types";
import OutlinedButton from "src/components/shared/OutlinedButton";
import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EditGarmentModal from "src/components/AdminPage/EditGarmentModal";
import EditImagesModal from "src/components/AdminPage/EditImagesModal";
import ConfirmModal from "src/components/shared/ConfirmModal";

import { useModalContext } from "src/context/ModalContext";
import { useDeleteGarment } from "src/queryHooks/useGarments";

interface GarmentContentProps {
  garment: GarmentData | undefined;
  admin?: boolean;
}

const GarmentContent: React.FC<GarmentContentProps> = ({ garment, admin }) => {
  const navigate = useNavigate();
  const { openModal, removeModal } = useModalContext();
  const { mutate: deleteGarment } = useDeleteGarment();
  const garmentTitleOption = {
    value: garment?.garmentTitleId,
    label: garment?.garmentTitle,
  };

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
              <p>
                <span>{item.name}: </span>
                {listToString}
              </p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Link") {
          return (
            <Styled.InfoItem key={item.name}>
              <p>
                <span>{item.name}: </span>
                <a href={item.value} target="_blank" rel="noreferrer">
                  view original website
                </a>
              </p>
            </Styled.InfoItem>
          );
        } else if (item.name === "Description") {
          const lines = item.value ? item.value.split("\n") : [];
          console.log("LINES", lines);
          return (
            <Styled.InfoItem key={item.name}>
              <span>{item.name}</span>
              {lines.map((line: string, index: number) => (
                <p key={index} className="description">
                  {line}
                </p>
              ))}
            </Styled.InfoItem>
          );
        } else {
          return (
            <Styled.InfoItem key={item.name}>
              <p>
                <span>{item.name}: </span>
                {item.value}
              </p>
            </Styled.InfoItem>
          );
        }
      })
    : [];

  const onClickEditImages = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const modal = (
      <EditImagesModal
        onCancel={() => removeModal()}
        garment={garment}
      />
    );

    openModal(modal);
  };

  const handleClickEdit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const modal = (
      <EditGarmentModal
        onCancel={() => removeModal()}
        garment={garment}
        garmentTitleOption={garmentTitleOption}
      />
    );

    openModal(modal);
  };

  const handleClickDelete = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const garmentId = garment ? garment.id : null;
    const modal = (
      <ConfirmModal
        onCancel={() => removeModal()}
        onConfirm={() => handleDeleteGarment(garmentId)}
        titleText="Confirm Deletion?"
        descriptionText="Are you sure you want to delete this garment? This action cannot be undone.  This garment and all its information will permanantly deleted."
        confirmText="DELETE"
        danger={true}
      />
    );

    openModal(modal);
  };

  function handleDeleteGarment(garmentId: number | null): void {
    if (garmentId) {
      deleteGarment(
        {
          itemId: garmentId,
        },
        {
          onSuccess: (data: any) => {
            console.log("Success deleting garment. Data:", data);
            removeModal();
            navigate(`/admin`);
          },
          onError: (error: any) => {
            const message = error && error.data ? error.data.message : "";
            console.log("Request Error:", message);
          },
        }
      );
    }
  }

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
            <OutlinedButton onClick={event => onClickEditImages(event)}>
              Edit Images
            </OutlinedButton>
          ) : null}
        </Styled.ButtonContainer>
      </Styled.ImagesSection>
      <Styled.DetailsSection>
        <Styled.InfoContainer>
          <Styled.HeaderContainer>
            <Styled.InfoTitleContainer>
              <Styled.InfoTitle>Garment Information</Styled.InfoTitle>
            </Styled.InfoTitleContainer>
            <Styled.IconButtonContainer>
              {admin ? (
                <IconButton
                  sx={{ color: "white" }}
                  onClick={event => handleClickEdit(event)}
                >
                  <BorderColorOutlinedIcon />
                </IconButton>
              ) : null}
            </Styled.IconButtonContainer>
          </Styled.HeaderContainer>
          <Styled.InfoContent>{itemNodes}</Styled.InfoContent>
        </Styled.InfoContainer>
      </Styled.DetailsSection>
      <Styled.DeleteButtonContainer>
        {admin ? (
          <OutlinedButton color="error" onClick={handleClickDelete}>
            Delete Garment
          </OutlinedButton>
        ) : null}
      </Styled.DeleteButtonContainer>
    </Styled.GarmentContainer>
  );
};

export default GarmentContent;

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
    min-height: 300px;
    flex-shrink: 1;

    ${t.mq.xs} {
      width: 500px;
      height: 609px;
      min-height: 609px;
    }

    img {
      width: 100vw;
      max-width: 480px;
      max-height: 575px;

      ${t.mq.xs} {
        width: 500px;
        height: 609px;
        max-width: 500px;
        max-height: 609px;
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

Styled.DetailsSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: Garment_DetailsSection;
    ${t.pt(4)}
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});

Styled.InfoContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Garment_InfoSection;
    ${[t.p(4), t.mb(6)]}
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background-color: ${t.color.blue[700]};
    border-radius: 8px;

    ${t.mq.sm} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
      ${[t.p(8)]}
    }
  `;
});

Styled.HeaderContainer = styled.div`
  label: Garment_InfoHeaderContainer
  width: 100%;
`;

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
    color: white;
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
    color: white;
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-family: "bellota text";

    span {
      color: ${t.color.blue_gray[200]};
    }

    a {
      overflow-wrap: break-word;
      &:hover {
        text-decoration: underline;
      }
    }

    .description {
      ${t.mb(2)}
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
