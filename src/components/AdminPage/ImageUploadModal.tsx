import React from "react";
import DialogModal from "src/components/shared/DialogModal";
import FileUpload from "src/components/shared/FileUpload";

import { useModalContext } from "src/context/ModalContext";

interface ImageUploadModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
}

const ImageUploadModal = (props: ImageUploadModalProps) => {

  const { modalOpen } = useModalContext();

  // const onConfirm = () => {
  //   props.onCancel()
  // }

  const title = "Upload Image"
  console.log("Image Upload Props", props)
  return (
    <>
      <DialogModal open={modalOpen} dialogTitle={title} onConfirm={props.onCancel} onCancel={props.onCancel}>
        <FileUpload />
      </DialogModal>
    </>
  )

};

export default ImageUploadModal;
