import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

import { ItemInfo } from "src/types";
import {
  colorOptions,
  materialOptions,
  garmentTitleOptions,
  Option,
} from "src/utils/lookups";
import {
  dateToString,
  stringToDate,
  convertEmptyStringsToNull,
} from "src/utils/formHelpers";
import OutlinedButton from "src/components/shared/OutlinedButton";
import {
  StyledAutocomplete,
  StyledTextField,
  StyledDatePicker,
} from "src/components/AdminPage/StyledFields";

import { useCreateGarment } from "src/queryHooks/useGarments";


type Props = {};

const GarmentForm = (props: Props) => {
  const { mutate: createGarment } = useCreateGarment();
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const [colors, setColors] = React.useState<Option[]>([]);
  const [materials, setMaterials] = React.useState<Option[]>([]);

  const initialState: ItemInfo = {
    //required items are set to strings or empty strings
    garmentTitle: "",
    beginYear: "1790",
    endYear: "",
    decade: "",
    secondaryDecade: "",
    cultureCountry: "",
    collection: "",
    creator: "",
    collectionUrl: "",
    source: "",
    itemCollectionNo: "",
    description: "",
  };

  const [state, setState] = React.useState(initialState);

  const {
    garmentTitle,
    beginYear,
    endYear,
    decade,
    secondaryDecade,
    cultureCountry,
    collection,
    creator,
    collectionUrl,
    source,
    itemCollectionNo,
    description,
  } = state;

  React.useEffect(() => {
    console.log("STATE", state);
    console.log("COLORS", colors);
    console.log("MATERIALS", materials);
  }, [state, colors, materials]);

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSingleSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    setState({ ...state, [name]: value });
  };

  const handleMultiSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    if (name === "colors") {
      setColors(value);
    } else if (name === "materials") {
      setMaterials(value);
    }
  };

  const handleDateInputChange = (value: any, name: string, unit: any) => {
    const dateString = dateToString(unit, value);
    setState({ ...state, [name]: dateString });
  };

  type Field = {
    kind: string;
    name: string;
    label: string;
    value: any;
    required: boolean;
    error: any;
    options?: Option[];
    unit?: string;
  };

  //kinds = singleSelect, multiSelect, text, textArea, date
  const titleFormField = [
    {
      kind: "singleSelect",
      name: "garmentTitle",
      label: "Title",
      options: garmentTitleOptions,
      value: garmentTitle,
      required: true,
      error: false,
    },
  ];

  const dateFormFields = [
    {
      kind: "date",
      name: "beginYear",
      label: "Begin Year",
      value: stringToDate("year", beginYear),
      required: true,
      error: false,
      unit: "year",
    },
    {
      kind: "date",
      name: "endYear",
      label: "End Year",
      value: endYear ? stringToDate("year", endYear) : null,
      required: false,
      error: false,
      unit: "year",
    },
  ];

  const decadeFormFields = [
    {
      kind: "text",
      name: "decade",
      label: "Decade",
      value: decade,
      required: false,
      error: false,
    },
    {
      kind: "text",
      name: "secondaryDecade",
      label: "Secondary Decade",
      value: secondaryDecade,
      required: false,
      error: false,
    },
  ];

  const leftFormFields = [
    {
      kind: "text",
      name: "cultureCountry",
      label: "Culture/Country",
      value: cultureCountry,
      required: false,
      error: false,
    },
    {
      kind: "multiSelect",
      name: "colors",
      label: "Colors",
      options: colorOptions,
      value: colors,
      required: false,
      error: false,
    },
    {
      kind: "multiSelect",
      name: "materials",
      label: "Materials",
      options: materialOptions,
      value: materials,
      required: false,
      error: false,
    },
    {
      kind: "textArea",
      name: "description",
      label: "Description",
      value: description,
      required: false,
      error: false,
    },
  ];

  const rightFormFields = [
    {
      kind: "text",
      name: "collection",
      label: "Museum/Collection",
      value: collection,
      required: true,
      error: false,
    },
    {
      kind: "text",
      name: "creator",
      label: "Designer/Maker",
      value: creator,
      required: false,
      error: false,
    },
    {
      kind: "text",
      name: "collectionUrl",
      label: "Source Link",
      value: collectionUrl,
      required: true,
      error: false,
    },
    {
      kind: "text",
      name: "source",
      label: "Credit Line/Source",
      value: source,
      required: false,
      error: false,
    },
    {
      kind: "text",
      name: "itemCollectionNo",
      label: "Institution Item Number",
      value: itemCollectionNo,
      required: true,
      error: false,
    },
  ];

  const buildFormFieldNodes = (fields: Field[]) =>
    fields.map((field: Field, index: number) => {
      const { kind, label, name, required, error, options, value, unit } =
        field;
      if (kind === "singleSelect") {
        return (
          <StyledAutocomplete
            key={name}
            disablePortal={true}
            id={name}
            options={options as Option[]}
            getOptionLabel={(option: unknown) => (option as Option).label}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                name={name}
                required={required}
                variant="filled"
                error={error}
              />
            )}
            onInputChange={(event, value) =>
              handleSingleSelectInputChange(event, name, value)
            }
          />
        );
      } else if (kind === "multiSelect") {
        return (
          <StyledAutocomplete
            key={name}
            value={value}
            disablePortal={true}
            id={name}
            options={options as Option[]}
            getOptionLabel={(option: unknown) => (option as Option).label}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                name={name}
                required={required}
                variant="filled"
                error={error}
              />
            )}
            multiple={true}
            onChange={(event, value) =>
              handleMultiSelectInputChange(event, name, value)
            }
          />
        );
      } else if (kind === "text") {
        const firstChildStyle = name === "decade" ? { mr: 2 } : {};
        return (
          <StyledTextField
            key={name}
            label={label}
            name={name}
            id={name}
            value={value}
            sx={firstChildStyle}
            onChange={event => handleTextInputChange(event, name)}
            variant="filled"
            required={required}
            error={error}
          />
        );
      } else if (kind === "textArea") {
        return (
          <StyledTextField
            key={name}
            label={label}
            value={value}
            id={name}
            multiline={true}
            minRows={4}
            onChange={event => handleTextInputChange(event, name)}
            variant="filled"
            required={required}
            error={error}
          />
        );
      } else if (kind === "date") {
        const firstChildStyle = index === 0 ? { mr: 2 } : {};
        return (
          <StyledDatePicker
            key={name}
            value={value}
            views={["year"]}
            sx={firstChildStyle}
            slots={{
              textField: TextField,
            }}
            slotProps={{
              textField: {
                label: label,
                name: name,
                required: required,
                variant: "filled",
              },
            }}
            onChange={value => handleDateInputChange(value, name, unit)}
            minDate={stringToDate("year", "1790")}
            maxDate={stringToDate("year", "1910")}
          />
        );
      } else {
        return null;
      }
    });

  const handleClickSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    if (formRef && formRef.current) {
      formRef.current.reportValidity();
    }
    const info = state;
    const colorIds: number[] =
      colors.length > 0 ? colors.map(color => color.value) : [];
    const materialIds: number[] =
      materials.length > 0 ? materials.map(material => material.value) : [];
    handleSubmitItem(info, colorIds, materialIds);
  };

  const handleSubmitItem = (
    itemInfo: ItemInfo,
    itemColors: number[],
    itemMaterials: number[]
  ): void => {
    const info = convertEmptyStringsToNull(itemInfo);
    createGarment(
      {
        itemInfo: info,
        itemColors: itemColors,
        itemMaterials: itemMaterials,
      },
      {
        onSuccess: () => {
          setState(initialState);
          setColors([]);
          setMaterials([]);
        },
        onError: (error: any) => {
          const message = error && error.data ? error.data.message : "";
          console.log("Request Error:", message);
        },
      }
    );
  };

  return (
    <Styled.GarmentFormContainer>
      <Styled.GarmentFormHeader>
        <h2>ADD NEW GARMENT</h2>
      </Styled.GarmentFormHeader>
      <Styled.Form onSubmit={handleClickSubmit} ref={formRef}>
        <Styled.FormSection>
          <Styled.FormFields>
            {buildFormFieldNodes(titleFormField)}
          </Styled.FormFields>
          <Styled.FormDateFields>
            {buildFormFieldNodes(dateFormFields)}
          </Styled.FormDateFields>
          <Styled.FormDateFields>
            {buildFormFieldNodes(decadeFormFields)}
          </Styled.FormDateFields>
          <Styled.FormFields>
            {buildFormFieldNodes(leftFormFields)}
          </Styled.FormFields>
        </Styled.FormSection>
        <Styled.FormSection>
          <Styled.FormFields>
            {buildFormFieldNodes(rightFormFields)}
          </Styled.FormFields>
          <Styled.ButtonContainer>
            <OutlinedButton type="submit" onClick={handleClickSubmit}>
              Submit
            </OutlinedButton>
          </Styled.ButtonContainer>
        </Styled.FormSection>
      </Styled.Form>
    </Styled.GarmentFormContainer>
  );
};

export default GarmentForm;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentFormContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentFormContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
});

Styled.GarmentFormHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentFormHeader;
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
    }
  `;
});

Styled.Form = styled.form(() => {
  return css`
    label: GarmentForm;
    margin: 2% 6% 6% 6%;
    width: 88%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
});

Styled.FormSection = styled.section(() => {
  return css`
    label: GarmentFormSection;
    margin: 1%;
    width: 46%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
});

Styled.FormDateFields = styled.div`
  label: GarmentFormDateSection;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

Styled.FormFields = styled.div`
  label: GarmentFormTitleField;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

Styled.ButtonContainer = styled.div(() => {
  return css`
    label: GarmentFormSubmitButton;
    width: 100%;
  `;
});
