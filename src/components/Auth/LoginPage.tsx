import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from "src/components/shared/NavBar";
import Login from "src/components/Auth/Login";

interface LoginPageProps {};

const LoginPage: React.FC<LoginPageProps> = props => {

  return (
    <Styled.LoginPageContainer>
      <NavBar backgroundColor="white" shadow={true}/>
      <Login />
    </Styled.LoginPageContainer>
  );
};

export default LoginPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LoginPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoginPageContainer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  `;
});