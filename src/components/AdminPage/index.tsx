import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Autocomplete, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ItemInfo } from "src/types";
import {
  colorOptions,
  materialOptions,
  garmentTitleOptions,
  Option,
} from "src/utils/lookups";
import { dateToString, stringToDate } from "src/utils/formHelpers";

type Props = {};

const AdminPage = (props: Props) => {
  const [colors, setColors] = React.useState<Option[]>([]);
  const [materials, setMaterials] = React.useState<Option[]>([]);

  const initialState: ItemInfo = {
    garmentTitle: garmentTitleOptions[0].label, //Material UI type
    beginYear: "1800",
    endYear: null,
    decade: "",
    secondaryDecade: "",
    cultureCountry: null,
    collection: null,
    creator: null,
    collectionUrl: "",
    source: null,
    itemCollectionNo: null,
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
      required: false,
      error: false,
      unit: "year",
    },
    {
      kind: "date",
      name: "endYear",
      label: "End Year",
      value: stringToDate("year", endYear),
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
      required: false,
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
      required: false,
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
      required: false,
      error: false,
    },
  ];

  const buildFormFieldNodes = (fields: Field[]) =>
    fields.map((field: Field, index: number) => {
      const { kind, label, name, required, error, options, value, unit } =
        field;
      const defaultStyle = { my: 1, width:"100%" };
      if (kind === "singleSelect") {
        return (
          <Autocomplete
            disablePortal={true}
            id={name}
            options={options as Option[]}
            getOptionLabel={(option: Option) => option.label}
            sx={defaultStyle}
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
          <Autocomplete
            disablePortal={true}
            id={name}
            options={options as Option[]}
            getOptionLabel={(option: Option) => option.label}
            sx={defaultStyle}
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
          <TextField
            label={label}
            name={name}
            id={name}
            value={value}
            sx={{...defaultStyle, ...firstChildStyle}}
            onChange={event => handleTextInputChange(event, name)}
            variant="filled"
            required={required}
            error={error}
          />
        );
      } else if (kind === "textArea") {
        return (
          <TextField
            label={label}
            value={value}
            id={name}
            multiline={true}
            minRows={4}
            sx={defaultStyle}
            onChange={event => handleTextInputChange(event, name)}
            variant="filled"
            required={required}
            error={error}
          />
        );
      } else if (kind === "date") {
        const firstChildStyle = index === 0 ? { mr: 2 } : {};
        return (
          <DatePicker
            value={value}
            views={["year"]}
            sx={{...defaultStyle, ...firstChildStyle}}
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info = state;
    const colorIds: number[] =
      colors.length > 0 ? colors.map(color => color.value) : [];
    const materialIds: number[] =
      materials.length > 0 ? materials.map(material => material.value) : [];
    onSubmitItem({
      itemInfo: info,
      itemColors: colorIds,
      itemMaterials: materialIds,
    });
  };

  const onSubmitItem = ({
    itemInfo,
    itemColors,
    itemMaterials,
  }: {
    itemInfo: ItemInfo;
    itemColors: number[];
    itemMaterials: number[];
  }) => {
    //TODO: create react-query hook for post request
  };

  return (
    <Styled.AdminPageContainer>
      <Styled.AdminPageHeader>
        <h2>ADD NEW GARMENT</h2>
      </Styled.AdminPageHeader>
      <Styled.Form onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ my: 1, width: "100%" }}
            >
              Submit
            </Button>
          </Styled.ButtonContainer>
        </Styled.FormSection>
      </Styled.Form>
    </Styled.AdminPageContainer>
  );
};

export default AdminPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.AdminPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
});

Styled.AdminPageHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageHeader;
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

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: AdminPageForm;
    margin: 2% 6% 6% 6%;
    width: 88%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
});

Styled.FormSection = styled.section(props => {
  const t = props.theme;
  return css`
    label: AdminPageFormSection;
    margin: 1%;
    width: 46%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
});

Styled.FormDateFields = styled.div`
  label: AdminPageFormDateSection;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

Styled.FormFields = styled.div`
  label: AdminPageTitleField;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

Styled.ButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminPageFormSubmitButton;
    width: 100%;
  `;
});
