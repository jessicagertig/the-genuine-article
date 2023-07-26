import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import OutlinedButton from "src/components/shared/OutlinedButton";
import DialogModal from "src/components/shared/DialogModal";
import FileUpload from "src/components/shared/FileUpload";

import { useModalContext } from "src/context/ModalContext";
import {
  useDeleteMainImage,
  useCreateMainImage,
  useUpdateMainImage,
} from "src/queryHooks/useImages";
import { GarmentData } from "src/types";

interface EditImagesModalProps {
  onCancel: () => void;
  garment: GarmentData | undefined;
}

const EditImagesModal: React.FC<EditImagesModalProps> = props => {
  const { garment } = props;
  const id = garment ? garment.id : null;
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const { modalOpen } = useModalContext();
  const { mutate: updateMainImage, isLoading: isLoadingUpdateMainImage } =
    useUpdateMainImage();
  const { mutate: createMainImage } = useCreateMainImage();
  const { mutate: deleteMainImage } = useDeleteMainImage();

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [existingImage, setExistingImage] = React.useState<string>("");
  const [hasImage, setHasImage] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  React.useEffect(() => {
    if (garment && garment.imageUrls !== null) {
      setExistingImage(garment.imageUrls.largeUrl);
      setHasImage(true)
    }
  }, [garment]);

  const handleChangeFileInput = (event: React.BaseSyntheticEvent) => {
    const file = event.target?.files ? event.target.files[0] : null;
    console.log("IMAGE FILE", file);
    setImageFile(file);

    // Create image URL and set to previewImage state
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClickDelete = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const garmentId = garment ? garment.id : null;
    deleteMainImage(
      garmentId,
      {
        onSuccess: (data: any) => {
          console.log("DATA", data);
          setPreviewImage(null);
          setExistingImage("");
          setHasImage(false)
        },
        onError: (error: any) => {
          console.log("ERROR", error);
        },
      }
    );
  };

  const handleConfirm = async () => {
    if (imageFile) {
      let formData = new FormData();
      formData.append("image", imageFile);

      // for (const [key, value] of formData.entries()) {
      //   console.log(`LOGGED ${key}:`, value);
      // }
      if (hasImage) {
        updateMainImage(
          { formData, id },
          {
            onSuccess: (data: any) => {
              console.log("DATA", data);
            },
            onError: (error: any) => {
              console.log("ERROR", error);
            },
          }
        );
      } else {
        createMainImage(
          { formData, id },
          {
            onSuccess: (data: any) => {
              console.log("DATA", data);
            },
            onError: (error: any) => {
              console.log("ERROR", error);
            },
          }
        );
      }
    }
    props.onCancel(); //removes modal
  };

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm} disabled={!previewImage}>
      Save
    </OutlinedButton>
  );

  const title = "EDIT IMAGES";

  return (
    <DialogModal
      open={modalOpen}
      dialogTitle={title}
      onCancel={props.onCancel}
      full={true}
      maxWidth="md"
      confirmButton={confirmButton}
      responsiveFullscreen={fullscreen}
    >
      <Styled.ModalContent>
        {!previewImage && hasImage ? (
          <Styled.ImageContainer>
            <img
              src={existingImage}
              alt={garment ? garment.garmentTitle : "garment"}
            />
          </Styled.ImageContainer>
        ) : null}
        {!previewImage && !hasImage ? (
          <Styled.PreviewImageContainer hasImage={previewImage}>
            <ImageOutlinedIcon fontSize="large" />
          </Styled.PreviewImageContainer>
        ) : null}
        {previewImage ? (
          <Styled.PreviewImageContainer hasImage={previewImage}>
            <img src={previewImage} alt="preview" />
          </Styled.PreviewImageContainer>
        ) : null}
        <Styled.ActionsContainer>
          <FileUpload
            handleChangeInput={handleChangeFileInput}
            fileName={imageFile?.name}
            variantType="outlined"
          />
          <IconButton
            sx={{ my: 3, px: 1 }}
            onClick={handleClickDelete}
            disabled={!hasImage}
          >
            <DeleteOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
        </Styled.ActionsContainer>
      </Styled.ModalContent>
    </DialogModal>
  );
};

export default EditImagesModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ModalContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: ModalContent;
    ${t.mx(4)}
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
});

Styled.ImageContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: PreviewImageContainer;
    ${t.m(2)}
    width: 225px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;

    img {
      width: auto;
      height: 300px;
    }
  `;
});

Styled.PreviewImageContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: PreviewImageContainer;
    ${t.m(2)}
    width: 225px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: ${props.hasImage ? "none" : "rgba(211, 217, 229, 0.5)"};
    border: ${props.hasImage ? "none" : "1px solid rgba(211, 217, 229, 0.8)"};

    img {
      width: auto;
      height: 300px;
    }
  `;
});

Styled.ActionsContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: PreviewImageContainer;
    ${t.pr(6)}
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  `;
});
