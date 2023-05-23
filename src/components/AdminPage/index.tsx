import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
    Autocomplete,
    TextField,
} from "@mui/material";

type Props = {};

const AdminPage = (props: Props) => {

  const state = {
    title: '',
    color: {label: '', id: 1}
  }
//kinds = singleSelect, multiSelect, text, textArea
  const formFields = [
    {
      kind: 'singleSelect',
      type: 'text',
      value: state.color.id,
      onChange: (e: any) => {},
      name: 'color',
      label: 'Color',
      multiline: false,
      minRows: 4,
      required: false,
      error: false,
      options: [{label: 'zealous', id: 1}, {label: 'alabama', id: 2}]
    },
    {
      kind: 'multiSelect',
      type: 'text',
      value: state.color.id,
      onChange: (e: any) => {},
      name: 'materials',
      label: 'Materials',
      multiline: false,
      minRows: 4,
      required: false,
      error: false,
      options: [{label: 'zealous', id: 1}, {label: 'alabama', id: 2}]
    },
    {
      kind: 'text',
      type: 'text',
      value: state.title,
      onChange: (e: any) => {},
      name: 'title',
      label: 'Title',
      multiline: false,
      minRows: 4,
      required: false,
      error: false,
    },
    {
      kind: 'textArea',
      type: 'text',
      value: state.title,
      onChange: (e: any) => {},
      name: 'description',
      label: 'Description',
      multiline: true,
      minRows: 4,
      required: false,
      error: false,
    }
  ]

  const formFieldNodes = formFields.map((formField) => {
    if (formField.kind === 'singleSelect') {
      return (
        <Autocomplete
          disablePortal
          id=""
          options={formField.options}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => <TextField {...params} label={formField.label} variant="filled"/>}
          onChange={formField.onChange}
          value={formField.value}
        />
      )
    } else if (formField.kind === 'multiSelect') {
      return (
        <Autocomplete
          disablePortal
          id=""
          options={formField.options}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => <TextField {...params} label={formField.label} variant="filled"/>}
          multiple={true}
          onChange={formField.onChange}
          value={formField.value}
        />
        )
    } else if (formField.kind === 'text') {
      return (
        <TextField
          type={formField.type}
          label={formField.label}
          value={formField.value}
          sx={{ m: 1, width: 300 }}
          onChange={formField.onChange}
          variant='filled'
        />
      )
    } else if (formField.kind === 'textArea') {
      return (
        <TextField
          type={formField.type}
          label={formField.label}
          value={formField.value}
          multiline={true}
          minRows={4}
          sx={{ m: 1, width: 300 }}
          onChange={formField.onChange}
          variant='filled'
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
        <TextField
          label='Title'
          type='text'
          value={state.title}
          variant='filled'
          sx={{ m: 1, width: 300 }}
        />
        <Autocomplete
          disablePortal
          id=""
          options={[{label: 'zealous', value: 1}, {label: 'alabama', value: 2}]}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => <TextField {...params} label='Select' variant="filled"/>}
          multiple={true}
        />
        <TextField
          type='text'
          value={state.title}
          multiline={true}
          minRows={4}
          variant='filled'
          sx={{ m: 1, width: 300 }}
          onChange={(e: any) => {}}
          label='Description'
        />
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