import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

import { ItemInfo } from "src/types";
import {
  returnConvertedMenus,
  Option,
  dateToString,
  stringToDate,
} from "src/utils/formHelpers";
import {
  StyledAutocomplete,
  StyledTextField,
  StyledDatePicker,
} from "src/components/AdminPage/StyledFields";

import { useMenus } from "src/queryHooks/useMenus";

interface GarmentFormProps {
  garmentInfo: Partial<ItemInfo>;
  defaultGarmentTitleOption?: Option;
  colors?: Option[];
  materials?: Option[];
  onSubmit: (event: React.FormEvent<Element>) => void;
  onGarmentChange: (garmentInfo: Partial<ItemInfo>) => void;
  onColorsChange: (colors: Option[]) => void;
  onMaterialsChange: (materials: Option[]) => void;
  loading: boolean;
}

const GarmentForm: React.FC<GarmentFormProps> = ({
  garmentInfo,
  defaultGarmentTitleOption,
  colors,
  materials,
  ...props
}) => {
  const { data: menus, isLoading: isLoadingMenus } = useMenus();

  const formRef = React.useRef<HTMLFormElement | null>(null);

  const [garmentTitleOptions, setGarmentTitleOptions] = React.useState<any[]>(
    []
  );
  const [materialOptions, setMaterialOptions] = React.useState<any[]>([]);
  const [colorOptions, setColorOptions] = React.useState<any[]>([]);

  const {
    garmentTitle,
    beginYear,
    endYear,
    cultureCountry,
    collection,
    creator,
    collectionUrl,
    source,
    itemCollectionNo,
    description,
  } = garmentInfo;
  
  React.useEffect(() => {
    if (menus) {
      const convertedMenus = returnConvertedMenus(menus);
      setColorOptions(convertedMenus["colorMenu"]);
      setMaterialOptions(convertedMenus["materialsMenu"]);
      setGarmentTitleOptions(convertedMenus["garmentTitlesMenu"]);
    }
  }, [menus, setColorOptions, setMaterialOptions, setGarmentTitleOptions]);

  // garmentInfo
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: any
  ) => {
    const value = event.target.value;
    props.onGarmentChange({ [name]: value });
  };

  // garmentTitle (garmentInfo)
  const handleSingleSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    console.log("change value", value)
    props.onGarmentChange({ [name]: value });
  };

  // colors or materials
  const handleMultiSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    if (name === "colors") {
      props.onColorsChange(value);
    } else if (name === "materials") {
      props.onMaterialsChange(value);
    }
  };

  // endYear or begingYear (garmentInfo)
  const handleDateInputChange = (value: any, name: string, unit: any) => {
    const dateString = dateToString(unit, value);
    props.onGarmentChange({ [name]: dateString });
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
      value: beginYear ? stringToDate("year", beginYear) : null,
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
            defaultValue={defaultGarmentTitleOption}
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
        return (
          <StyledTextField
            key={name}
            label={label}
            name={name}
            id={name}
            value={value}
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

  return (
    <Styled.GarmentFormContainer>
      <Styled.Form onSubmit={props.onSubmit} ref={formRef}>
        <Styled.FormSection>
          <Styled.FormFields>
            {buildFormFieldNodes(titleFormField)}
          </Styled.FormFields>
          <Styled.FormDateFields>
            {buildFormFieldNodes(dateFormFields)}
          </Styled.FormDateFields>
          <Styled.FormFields>
            {buildFormFieldNodes(leftFormFields)}
          </Styled.FormFields>
        </Styled.FormSection>
        <Styled.FormSection>
          <Styled.FormFields>
            {buildFormFieldNodes(rightFormFields)}
          </Styled.FormFields>
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

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: GarmentForm;
    margin: 0%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    ${t.mq.md} {
      margin: 0% 6% 0% 6%;
      width: 88%;
      flex-direction: row;
      justify-content: space-between;
    }
  `;
});

Styled.FormSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: GarmentFormSection;
    margin: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    ${t.mq.md} {
      width: 46%;
    }
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
