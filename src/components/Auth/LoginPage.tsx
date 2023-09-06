import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import NavBar from "src/components/shared/NavBar";
import Login from "src/components/Auth/Login";

import { useAuthContext } from "src/context/AuthContext";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = props => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Login page currentUser", currentUser);
    if (currentUser) {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  return (
    <Styled.LoginPageContainer>
      <NavBar backgroundColor="white" shadow={false} />
      <Login />
    </Styled.LoginPageContainer>
  );
};

export default LoginPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LoginPageContainer = styled.div(() => {
  return css`
    label: LoginPageContainer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  `;
});
