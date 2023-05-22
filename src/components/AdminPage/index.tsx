import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
    Autocomplete,
    FilledInput,
    TextField,
} from "@mui/material";

type Props = {};

const AdminPage = (props: Props) => {

  const state = {
    title: '',
  }

  return (
    <Styled.AdminPageContainer>
      <Styled.AdminPageHeader>
        <h2>ADD NEW GARMENT</h2>
      </Styled.AdminPageHeader>
      <form>
        <FilledInput
          placeholder='Title'
          type='text'
          value={state.title}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{label: 'zealous', value: 1}, {label: 'alabama', value: 2}]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} placeholder='select' variant="filled"/>}
          multiple={true}
        />
        <FilledInput
          placeholder='Description'
          type='text'
          value={state.title}
          multiline={true}
          minRows={4}
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