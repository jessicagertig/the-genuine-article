import React from "react";

import OutlinedButton from "src/components/shared/OutlinedButton";
import DialogModal from "src/components/shared/DialogModal";
import GarmentForm from "src/components/AdminPage/GarmentForm";
import { GarmentData } from "src/types";

import { useModalContext } from "src/context/ModalContext";

interface EditGarmentModalProps {
  onCancel: () => void;
  onComplete: () => void;
  garment?: GarmentData;
}

const EditGarmentModal: React.FC<EditGarmentModalProps> = props => {

  const { modalOpen } = useModalContext();
  const title = "Edit garment"


  const handleConfirm = () => {
    props.onCancel(); //removes modal
  }

  const confirmButton = (
    <OutlinedButton onClick={handleConfirm}>Save changes</OutlinedButton>
  );

  return (
    <DialogModal 
      open={modalOpen}
      dialogTitle={title}
      onCancel={props.onCancel}
      confirmButton={confirmButton}
    >
      <GarmentForm
        onGarmentChange={}
        onColorsChange={}
        onMaterialsChange={}
        loading={}
      />
    </DialogModal>
  )
}

export default EditGarmentModal;