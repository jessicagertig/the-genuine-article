import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import textFieldStyles from "src/components/Auth/styles";
import { useAuthContext } from "src/context/AuthContext";
import { useLoginUser } from "src/queryHooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { mutate: loginUser } = useLoginUser();
  interface CurrentUser {
    username: string;
    email: string;
  }

  interface LoginData {
    user: CurrentUser;
    token: string;
  }

  interface LoginParams {
    email: string;
    password: string;
  }

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const { currentUser } = useAuthContext();

  React.useEffect(() => {
    if (currentUser) {
      navigate("/admin");
    }
  }, []);

  const { email, password } = state;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    console.log("Submit clicked");
    event.preventDefault();
    handleLogin(state);
  };

  const handleLogin = async (loginParams: LoginParams) => {
    // todo: add validation with Yup
    try {
      loginUser(
        {
          email: loginParams.email,
          password: loginParams.password,
        },
        {
          onSuccess: (data: LoginData) => {
            console.log("Success logging in user. Data:", data?.user);
            const token = data.token;
            if (data.token) {
              console.log("saving token");
              localStorage.setItem("token", token);
            }
            navigate("/admin");
          },
          onError: (error: any) => {
            const message = error && error.data ? error.data.message : "";
            console.log("Request Error:", message);
          },
        }
      );
    } catch (e) {
      console.error("ERROR:", e);
    }
  };

  return (
    <Styled.Container>
      <Paper
        sx={{ width: isMobile ? "100%" : "450px", minWidth: "300px" }}
        square={isMobile}
      >
        <Styled.FormContainer>
          <Styled.TextContainer>
            <h2>Login</h2>
          </Styled.TextContainer>
          <Styled.Form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              sx={textFieldStyles}
              required={true}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              sx={textFieldStyles}
              required={true}
            />
            <Styled.ButtonsContainer>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: "#020b1c",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  lineHeight: "1.75rem",
                  padding: "10px 0",
                  marginTop: 3,
                  textTransform: "none",
                  width: "128px",
                }}
              >
                Log in
              </Button>
              <Styled.Button>Log in as Guest</Styled.Button>
            </Styled.ButtonsContainer>
          </Styled.Form>
        </Styled.FormContainer>
      </Paper>
    </Styled.Container>
  );
};

export default Login;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: Login_Container;
    height: calc(100vh - 48px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #020b1c;

    ${t.mq.md} {
      height: calc(100vh - 90px);
    }
  `;
});

Styled.FormContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Login_FormContainer;
    ${[t.pb(8), t.pt(3), t.my(4)]}
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 86%;
    margin-right: 7%;
    margin-left: 7%;
    height: 350px;

    ${t.mq.sm} {
      ${[t.px(8)]}
      width: 500px;
      width: 96%;
      margin-right: 2%;
      margin-left: 2%;
    }
  `;
});

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: Login_Form;
    ${[t.pb(8), t.pt(4)]}
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `;
});

Styled.TextContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: Login_TextContainer;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    h2 {
      font-family: "bellota text";
      font-size: 1.75rem;
      color: #020b1c;
      font-weight: 600;
      ${t.my(4)}
    }
  `;
});

Styled.ButtonsContainer = styled.div(props => {
  const t = props.theme;
  return css`
    ${[t.pl(2), t.pb(1)]}
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `;
});

Styled.Button = styled.div(props => {
  const t = props.theme;
  return css`
    ${[t.pl(2), t.pb(1)]}
    font-size: 1rem;
    font-family: bellota text;
    color: #020b1c;

    &:hover {
      cursor: pointer;
      font-size: 1.02rem;
    }
  `;
});
