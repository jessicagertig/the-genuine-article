import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import OutlinedButton from "src/components/shared/OutlinedButton";
import DialogModal from "src/components/shared/DialogModal";
import GarmentForm from "src/components/AdminPage/GarmentForm";
import { GarmentData, ItemInfo } from "src/types";
import { Option, convertEmptyStringsToNull } from "src/utils/formHelpers";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import { useCreateGarment } from "src/queryHooks/useGarments";

interface AddGarmentModalProps {
  onCancel: () => void;
}

const AddGarmentModal: React.FC<AddGarmentModalProps> = props => {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const { modalOpen } = useModalContext();
  const addToast = useToastContext();
  const { mutate: createGarment, isLoading: isLoadingCreateGarment } =
    useCreateGarment();

  const title = "ADD GARMENT";

  const [colors, setColors] = React.useState<Option[]>([]);
  const [materials, setMaterials] = React.useState<Option[]>([]);
  const [infoState, setInfoState] = React.useState<ItemInfo>({
    garmentTitle: "",
    beginYear: "",
    endYear: "",
    cultureCountry: "",
    collection: "",
    creator: "",
    collectionUrl: "",
    source: "",
    itemCollectionNo: "",
    description: "",
  });

  const handleGarmentChange = (changes: any) => {
    setInfoState({ ...infoState, ...changes });
  };

  const handleColorsChange = (changes: any) => {
    setColors(changes);
  };

  const handleMaterialsChange = (changes: any) => {
    setMaterials(changes);
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    // TO DO: add validation here
    handleSubmitItem();
  };

  const handleSubmitItem = (): void => {
    const info = convertEmptyStringsToNull(infoState);
    const colorIds: number[] =
      colors.length > 0 ? colors.map(color => color.value) : [];
    const materialIds: number[] =
      materials.length > 0 ? materials.map(material => material.value) : [];
    createGarment(
      {
        itemInfo: info,
        itemColors: colorIds,
        itemMaterials: materialIds,
      },
      {
        onSuccess: (data: GarmentData) => {
          console.log("Success creating garment. Data:", data);
          addToast({
            kind: "success",
            title: "Your record was successfully created",
            delay: 5000,
          });
          props.onCancel();
        },
        onError: (error: any) => {
          const message = error && error.data ? error.data.message : "";
          addToast({
            kind: "error",
            title: message,
            delay: 5000,
          });
          console.log("Request Error:", message);
        },
      }
    );
  };

  const submitButton = (
    <OutlinedButton type="submit" onClick={handleSubmit}>
      Save
    </OutlinedButton>
  );

  return (
    <DialogModal
      open={modalOpen}
      dialogTitle={title}
      onCancel={props.onCancel}
      full={true}
      confirmButton={submitButton}
      responsiveFullscreen={fullscreen}
    >
      <GarmentForm
        garmentInfo={infoState}
        onSubmit={handleSubmit}
        onGarmentChange={handleGarmentChange}
        onColorsChange={handleColorsChange}
        onMaterialsChange={handleMaterialsChange}
        loading={isLoadingCreateGarment}
      />
    </DialogModal>
  );
};

export default AddGarmentModal;
