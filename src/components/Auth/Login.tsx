import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import textFieldStyles from "src/components/Auth/styles";
import { useAuthContext } from "src/context/AuthContext";
import { useLoginUser } from "src/queryHooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
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
      <Paper sx={{ width: "400px", minWidth: "300px" }}>
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: "#172a4f",
              fontWeight: "bold",
              fontSize: "1rem",
              lineHeight: "1.75rem",
              padding: "10px 0",
              marginTop: 3,
            }}
          >
            Login
          </Button>
        </Styled.Form>
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
    justify-content: center;
    align-items: center;
    background-color: #172a4f;

    ${t.mq.md} {
      height: calc(100vh - 90px);
    }
  `;
});

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: Login_Form;
    ${[t.px(8), t.pt(8)]}
    display: flex;
    width: 96%;
    margin-right: 2%;
    margin-left: 2%;
    height: 300px;
    flex-direction: column;

    ${t.mq.sm} {
      ${[t.p(6), t.m(4)]}
      width: 400px;
    }
  `;
});
