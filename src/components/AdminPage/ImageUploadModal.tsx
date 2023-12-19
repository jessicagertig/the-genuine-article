import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import DialogModal from "src/components/shared/DialogModal";
import FileUpload from "src/components/shared/FileUpload";
import OutlinedButton from "src/components/shared/OutlinedButton";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";

import { useCreateMainImage } from "src/queryHooks/useImages";

interface ImageUploadModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  id: number;
}

const ImageUploadModal = (props: ImageUploadModalProps) => {
  console.log("Image Upload Modal Props", props);

  const { id } = props;

  const { mutate: createMainImage } = useCreateMainImage();

  const { modalOpen } = useModalContext();
  const addToast = useToastContext();

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleChangeFileInput = (event: React.BaseSyntheticEvent) => {
    const file = event.target?.files ? event.target.files[0] : null;
    console.log("IMAGE FILE", file);
    setImageFile(file);

    // Create image URL and set to previewImage state
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    if (imageFile) {
      let formData = new FormData();
      formData.append("image", imageFile);

      // for (const [key, value] of formData.entries()) {
      //   console.log(`LOGGED ${key}:`, value);
      // }

      await createMainImage(
        { formData, id },
        {
          onSuccess: (data: any) => {
            console.log("DATA", { data });
            addToast({
              kind: "success",
              title: data?.message,
              delay: 5000,
            });
            props.onCancel(); //removes modal
          },
          onError: (error: any) => {
            addToast({
              kind: "error",
              title: "Your image upload failed",
              delay: 5000,
            });
            console.log("ERROR", error);
            props.onCancel(); //removes modal
          },
        }
      );
    }
  };

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm} disabled={!previewImage}>
      Upload
    </OutlinedButton>
  );

  const title = "UPLOAD MAIN IMAGE";

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={props.onCancel}
        confirmButton={confirmButton}
      >
        <Styled.ModalContent>
          <Styled.PreviewImageContainer hasImage={previewImage}>
            {!previewImage && <ImageOutlinedIcon fontSize="large" />}
            {previewImage && <img src={previewImage} alt="preview" />}
          </Styled.PreviewImageContainer>
          <FileUpload
            handleChangeInput={handleChangeFileInput}
            fileName={imageFile?.name}
          />
        </Styled.ModalContent>
      </DialogModal>
    </>
  );
};

export default ImageUploadModal;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.ModalContent = styled.div(props => {
  const t = props.theme;
  return css`
    label: ModalContent;
    ${t.mx(4)}
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
});

Styled.PreviewImageContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: PreviewImageContainer;
    ${t.m(2)}
    width: 175px;
    height: 225px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: ${props.hasImage ? "none" : "rgba(211, 217, 229, 0.5)"};
    border: ${props.hasImage ? "none" : "1px solid rgba(211, 217, 229, 0.8)"};

    img {
      width: auto;
      height: 225px;
    }
  `;
});
