import React from "react";
import DialogModal from "src/components/shared/DialogModal";
import FileUpload from "src/components/shared/FileUpload";
import OutlinedButton from "src/components/shared/OutlinedButton";

import { useModalContext } from "src/context/ModalContext";

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

  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const handleChangeFileInput = (event: React.BaseSyntheticEvent) => {
    const file = event.target?.files ? event.target.files[0] : null;
    console.log("IMAGE FILE", file);
    setImageFile(file);
  };

  const handleConfirm = async () => {
    if (imageFile) {
      let formData = new FormData();
      formData.append("image", imageFile);

      // for (const [key, value] of formData.entries()) {
      //   console.log(`LOGGED ${key}:`, value);
      // }

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
    props.onCancel(); //removes modal
  };

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm}>Upload now</OutlinedButton>
  );

  const title = "Select Image";

  return (
    <>
      <DialogModal
        open={modalOpen}
        dialogTitle={title}
        onCancel={props.onCancel}
        confirmButton={confirmButton}
      >
        <FileUpload
          handleChangeInput={handleChangeFileInput}
          fileName={imageFile?.name}
        />
      </DialogModal>
    </>
  );
};

export default ImageUploadModal;
