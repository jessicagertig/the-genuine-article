import React from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
    Autocomplete,
    TextField,
} from "@mui/material";

import { ItemInfo } from 'src/types';
import {
  colorOptions,
  materialOptions,
  garmentTitleOptions,
  Option
} from 'src/utils/lookups';

type Props = {};

const AdminPage = (props: Props) => {

  const [colors, setColors] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);

  const initialState: ItemInfo = {
    garmentTitle: garmentTitleOptions[0].label, //Material UI type
    garmentType: '',
    beginYear: 1800,
    endYear: undefined,
    decade: '',
    secondaryDecade: '',
    cultureCountry: null,
    collection: null,
    creator: null,
    collectionUrl: '',
    source: null,
    itemCollectionNo: null,
    description: '',
  }

  const [state, setState] = React.useState(initialState)

  const { garmentTitle, garmentType, beginYear, endYear, decade, secondaryDecade, cultureCountry, collection, creator, collectionUrl, source, itemCollectionNo, description} = state

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
      setState({...state, [name]: event.target.value})
  }

  const handleSelectInputChange = (event: React.SyntheticEvent, value: any, name: string) => {
    console.log('EVENT SELECT', event.currentTarget)
    console.log('VALUE', value)
    console.log('NAME', name)
  }

  type Field = {
    kind: string;
    name: string;
    label: string;
    value: any;
    required: boolean;
    error: any;
    options?: Option[];
  };
  

  console.log('coloroptions', colorOptions)
  //kinds = singleSelect, multiSelect, text, textArea
  const formFields = [
    {
      kind: 'singleSelect',
      name: 'garmentTitle',
      label: 'Title',
      options: garmentTitleOptions,
      value: garmentTitle,
      required: false,
      error: false,
    },
    {
      kind: 'text',
      name: 'garmentType',
      label: 'Garment Type',
      value: garmentType,
      required: false,
      error: false,
    },
    {
      kind: 'textArea',
      name: 'description',
      label: 'Description',
      value: description,
      required: false,
      error: false,
    },
    {
      kind: 'multiSelect',
      name: 'colors',
      label: 'Colors',
      options: colorOptions,
      value: colors,
      required: false,
      error: false,
    },
    {
      kind: 'multiSelect',
      name: 'materials',
      label: 'Materials',
      options: materialOptions,
      value: materials,
      required: false,
      error: false,
    },
  ]

  const formFieldNodes = formFields.map((field: Field) => {
    const { kind, label, name, required, error, options, value } = field
    if (kind === 'singleSelect') {
      return (
        <Autocomplete
          disablePortal={true}
          id={name}
          options={options as Option[]}
          getOptionLabel={(option: Option) => option.label}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label={label}
              name={name}
              required={required} 
              variant="filled"
              error={error}
              />}
          onChange={(event, value) => handleSelectInputChange(event, value, name)}
        />
      )
    } else if (kind === 'multiSelect') {
      return (
        <Autocomplete
          disablePortal={true}
          id={name}
          options={options as Option[]}
          getOptionLabel={(option: Option) => option.label}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => 
              <TextField 
                {...params} 
                label={label}
                name={name}
                required={required} 
                variant="filled"
                error={error}
                />}
            multiple={true}
            onChange={(event, value) => handleSelectInputChange(event, value, name)}
        />
        )
    } else if (kind === 'text') {
      return (
        <TextField
          label={label}
          name={name}
          id={name}
          value={value}
          sx={{ m: 1, width: 300 }}
          onChange={(event) => handleTextInputChange(event, name)}
          variant='filled'
          required={required}
          error={error}
        />
      )
    } else if (kind === 'textArea') {
      return (
        <TextField
          label={label}
          value={value}
          id={name}
          multiline={true}
          minRows={4}
          sx={{ m: 1, width: 300 }}
          onChange={(event) => handleTextInputChange(event, name)}
          variant='filled'
          required={required}
          error={error}
        />
      )
    } else {
      return null
    }
  });



  return (
    <Styled.AdminPageContainer>
      <Styled.AdminPageHeader>
        <h2>ADD NEW GARMENT</h2>
      </Styled.AdminPageHeader>
      <form>
        {formFieldNodes}
      </form>
    </Styled.AdminPageContainer>
  );
};

export default AdminPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.AdminPageContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: AdminPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
  `;
});

Styled.AdminPageHeader = styled.div((props) => {
  const t = props.theme;
  return css`
    label: AdminPageHeader;
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;

    h2 {
      font-family: 'bellota text';
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
    }
  `;
});