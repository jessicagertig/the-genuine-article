import React from "react";
import DialogModal from "src/components/shared/DialogModal";
import FileUpload from "src/components/shared/FileUpload";

interface ImageUploadModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ImageUploadModal = (props: ImageUploadModalProps) => {

  const title = "Upload Image"
  console.log("Image Upload Props", props)
  return (
    <>
      <DialogModal open={props.open} dialogTitle={title} onConfirm={props.onConfirm} onCancel={props.onCancel}>
        <FileUpload />
      </DialogModal>
    </>
  )

};

export default ImageUploadModal;
