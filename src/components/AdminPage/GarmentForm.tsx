import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";

import { ItemInfo, GarmentErrors } from "src/types";
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
  resetError: (name: string) => void;
  errors: GarmentErrors;
}

const GarmentForm: React.FC<GarmentFormProps> = ({
  garmentInfo,
  defaultGarmentTitleOption,
  colors,
  materials,
  errors,
  ...props
}) => {
  const { data: menus } = useMenus();

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
      setColorOptions(convertedMenus["colorsMenu"]);
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
    props.resetError(name);
  };

  // garmentTitle (garmentInfo)
  const handleSingleSelectInputChange = (
    event: React.SyntheticEvent,
    name: string,
    value: any
  ) => {
    console.log("change value", value);
    props.onGarmentChange({ [name]: value });
    props.resetError(name);
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
    props.resetError(name);
  };

  // endYear or begingYear (garmentInfo)
  const handleDateInputChange = (value: any, name: string, unit: any) => {
    const dateString = dateToString(unit, value);
    props.onGarmentChange({ [name]: dateString });
    props.resetError(name);
  };

  type Field = {
    kind: string;
    name: string;
    label: string;
    value: any;
    required: boolean;
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
    },
  ];

  const dateFormFields = [
    {
      kind: "date",
      name: "beginYear",
      label: "Begin Year",
      value: beginYear ? stringToDate("year", beginYear) : null,
      required: true,
      unit: "year",
    },
    {
      kind: "date",
      name: "endYear",
      label: "End Year",
      value: endYear ? stringToDate("year", endYear) : null,
      required: false,
      unit: "year",
    },
  ];

  const leftFormFields = [
    {
      kind: "text",
      name: "cultureCountry",
      label: "Culture/Country",
      value: cultureCountry,
      required: true,
    },
    {
      kind: "multiSelect",
      name: "colors",
      label: "Colors",
      options: colorOptions,
      value: colors,
      required: false,
    },
    {
      kind: "multiSelect",
      name: "materials",
      label: "Materials",
      options: materialOptions,
      value: materials,
      required: false,
    },
    {
      kind: "textArea",
      name: "description",
      label: "Description",
      value: description,
      required: false,
    },
  ];

  const rightFormFields = [
    {
      kind: "text",
      name: "collection",
      label: "Museum/Collection",
      value: collection,
      required: true,
    },
    {
      kind: "text",
      name: "creator",
      label: "Designer/Maker",
      value: creator,
      required: false,
    },
    {
      kind: "text",
      name: "collectionUrl",
      label: "Source Link",
      value: collectionUrl,
      required: true,
    },
    {
      kind: "text",
      name: "source",
      label: "Credit Line/Source",
      value: source,
      required: false,
    },
    {
      kind: "text",
      name: "itemCollectionNo",
      label: "Institution Item Number",
      value: itemCollectionNo,
      required: true,
    },
  ];

  const buildFormFieldNodes = (fields: Field[]) =>
    fields.map((field: Field, index: number) => {
      const { kind, label, name, required, options, value, unit } = field;

      const errorName = required && (`${name}Error` as keyof GarmentErrors);
      const hasError = errorName ? Boolean(errors[errorName]) : errorName;
      const errorText = errorName && errors[errorName];

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
                error={hasError}
                helperText={errorText}
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
                error={hasError}
                helperText={errorText}
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
            error={hasError}
            helperText={errorText}
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
            rows={5}
            onChange={event => handleTextInputChange(event, name)}
            variant="filled"
            required={required}
            error={hasError}
            helperText={errorText}
            style={{
              height: "149px", marginBottom: "28px",
            }}
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
                error: hasError,
                helperText: errorText,
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
          <Styled.Error>
            {errors.requestError ? <p>{errors.requestError}</p> : null}
          </Styled.Error>
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

Styled.Error = styled.div(() => {
  return css`
    height: 28px;

    p {
      font-size: 0.875rem;
      color: red;
    }
  `;
});
