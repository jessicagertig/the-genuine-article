import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import OutlinedButton from "src/components/shared/OutlinedButton";
import DialogModal from "src/components/shared/DialogModal";
import GarmentForm from "src/components/AdminPage/GarmentForm";
import ButtonLoading from "src/components/shared/ButtonLoading";

import { GarmentData, ItemInfo } from "src/types";
import {
  Option,
  convertEmptyStringsToNull,
  returnConvertedMenus,
} from "src/utils/formHelpers";

import { useModalContext } from "src/context/ModalContext";
import { useToastContext } from "src/context/ToastContext";
import { useUpdateGarment } from "src/queryHooks/useGarments";
import { useMenus } from "src/queryHooks/useMenus";

interface EditGarmentModalProps {
  onCancel: () => void;
  garment?: GarmentData;
  garmentTitleOption?: Option | any;
}

const EditGarmentModal: React.FC<EditGarmentModalProps> = ({
  garment,
  garmentTitleOption,
  ...props
}) => {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));
  const { modalOpen } = useModalContext();
  const addToast = useToastContext();
  const { mutate: updateGarment, isLoading: isLoadingUpdateGarment } =
    useUpdateGarment();
  const { data: menus } = useMenus();

  const title = "EDIT GARMENT";

  const initialInfoState = React.useMemo(() => {
    return {
      garmentTitle: garment ? garment?.garmentTitle : "",
      beginYear: garment ? garment?.beginYear : "",
      endYear: garment?.endYear ? garment?.endYear : "",
      cultureCountry: garment ? garment?.cultureCountry : "",
      collection: garment ? garment?.collection : "",
      creator: garment?.creator ? garment?.creator : "",
      collectionUrl: garment ? garment?.collectionUrl : "",
      source: garment?.source ? garment?.source : "",
      itemCollectionNo: garment ? garment?.itemCollectionNo : "",
      description: garment?.description ? garment?.description : "",
    };
  }, [garment]);

  const [colorsState, setColorsState] = React.useState<Option[]>([]);
  const [materialsState, setMaterialsState] = React.useState<Option[]>([]);
  const [infoState, setInfoState] =
    React.useState<Partial<ItemInfo>>(initialInfoState);
  const [itemId, setItemId] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (garment) {
      setInfoState(initialInfoState);
      setItemId(garment.id);
    }
    if (garment && menus) {
      const convertedMenus = returnConvertedMenus(menus);
      const colorMenu = convertedMenus["colorMenu"];
      const colorOptions = colorMenu.filter(option =>
        garment.colors.includes(option.label)
      );
      setColorsState(colorOptions);
      const materialMenu = convertedMenus["materialsMenu"];
      const materialOptions = materialMenu.filter(option =>
        garment.materials.includes(option.label)
      );
      setMaterialsState(materialOptions);
    }
  }, [menus, garment, initialInfoState]);

  interface IndexSignatureType {
    [key: string]: string | { value: number; label: string };
  }

  const handleGarmentChange = (changes: IndexSignatureType) => {
    // console.log("CHANGES", changes);
    let value = changes;
    if (changes.hasOwnProperty("garmentTitle")) {
      const object = changes["garmentTitle"];
      if (typeof object !== "string") {
        value = { garmentTitle: object.label };
      }
    }
    // console.log("CHANGES NEW VALUE", value);
    setInfoState({ ...infoState, ...value });
  };

  const handleColorsChange = (changes: any) => {
    setColorsState(changes);
  };

  const handleMaterialsChange = (changes: any) => {
    setMaterialsState(changes);
  };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    // TO DO: add validation here
    handleSubmitItem();
  };

  const handleSubmitItem = (): void => {
    const info = convertEmptyStringsToNull(infoState);
    const colorIds: number[] =
      colorsState.length > 0 ? colorsState.map(color => color.value) : [];
    const materialIds: number[] =
      materialsState.length > 0
        ? materialsState.map(material => material.value)
        : [];
    updateGarment(
      {
        itemId: itemId,
        itemInfo: info,
        itemColors: colorIds,
        itemMaterials: materialIds,
      },
      {
        onSuccess: (data: GarmentData) => {
          console.log("Success updating garment. Data:", data);
          addToast({
            kind: "success",
            title: "Your record was successfully updated",
            delay: 5000,
          });
          props.onCancel();
        },
        onError: (error: any, data: any) => {
          const message =
            error && error.data
              ? error.data.message
              : "Your record could not be updated.";
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
      {isLoadingUpdateGarment ? <ButtonLoading /> : "Save"}
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
        defaultGarmentTitleOption={garmentTitleOption}
        colors={colorsState}
        materials={materialsState}
        onSubmit={handleSubmit}
        onGarmentChange={handleGarmentChange}
        onColorsChange={handleColorsChange}
        onMaterialsChange={handleMaterialsChange}
        loading={isLoadingUpdateGarment}
      />
    </DialogModal>
  );
};

export default EditGarmentModal;
