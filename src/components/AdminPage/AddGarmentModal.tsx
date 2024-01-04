import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import OutlinedButton from "src/components/shared/OutlinedButton";
import DialogModal from "src/components/shared/DialogModal";
import GarmentForm from "src/components/AdminPage/GarmentForm";
import {
  GarmentData,
  RequiredItemInfo,
  ItemInfo,
  GarmentErrors,
} from "src/types";
import ButtonLoading from "src/components/shared/ButtonLoading";
import { Option, convertEmptyStringsToNull } from "src/utils/formHelpers";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import { useCreateGarment } from "src/queryHooks/useGarments";

import { validateGarmentField } from "src/utils/validationWithYup";

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

  const [errors, setErrors] = React.useState<GarmentErrors>({
    garmentTitleError: "",
    beginYearError: "",
    cultureCountryError: "",
    collectionError: "",
    collectionUrlError: "",
    itemCollectionNoError: "",
    requestError: "",
  });

  const resetError = (name: string) => {
    const errorName = `${name}Error`;
    setErrors({ ...errors, [errorName]: "", requestError: "" });
  };

  const handleGarmentChange = (changes: any) => {
    setInfoState({ ...infoState, ...changes });
  };

  const handleColorsChange = (changes: any) => {
    setColors(changes);
  };

  const handleMaterialsChange = (changes: any) => {
    setMaterials(changes);
  };

  const requiredFields: Array<keyof RequiredItemInfo> = [
    "garmentTitle",
    "beginYear",
    "cultureCountry",
    "collection",
    "collectionUrl",
    "itemCollectionNo",
  ];

  const validateRequiredInfoFields = async (info: ItemInfo) => {
    let newErrors: GarmentErrors = { ...errors }; // Start with the current errors
    let hasError = false;

    for (const field of requiredFields) {
      const message = await validateGarmentField({
        key: field,
        value: info[field],
      });
      const errorName = `${field}Error`;
      if (errorName in errors) {
        // errorName is a key of errors, safe to proceed
        if (message) {
          hasError = true;
          // Update the newErrors object instead of calling setErrors
          newErrors[errorName as keyof GarmentErrors] = message;
        }
      } else {
        // errorName is not a key of errors, handle accordingly
        console.error(`Invalid errorName: ${errorName}`);
      }
    }
    // After the loop, update the state once with the new errors
    setErrors(newErrors);

    return hasError;
  };

  const handleSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    const hasValidationErrors = await validateRequiredInfoFields(infoState);
    if (!hasValidationErrors) {
      handleSubmitItem();
    }
  };

  const handleSubmitItem = (): void => {
    const info = convertEmptyStringsToNull(infoState);
    const colorIds: number[] =
      colors.length > 0 ? colors.map(color => color.value) : [];
    const materialIds: number[] =
      materials.length > 0 ? materials.map(material => material.value) : [];
    // TO DO: decide how to handle request errors - perhaps check status type & if not 500 then display message on form - otherwise show toast with lengthened display time?
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
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "You record could not be added.";
          addToast({
            kind: "error",
            title: message,
            delay: 5000,
          });
          console.log("Request Error:", { message, data });
        },
      }
    );
  };

  const submitButton = (
    <OutlinedButton type="submit" onClick={handleSubmit}>
      {isLoadingCreateGarment ? <ButtonLoading /> : "Save"}
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
        resetError={resetError}
        errors={errors}
      />
    </DialogModal>
  );
};

export default AddGarmentModal;
