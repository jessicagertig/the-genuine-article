import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import textFieldStyles from "src/components/Auth/styles";
import { useAuthContext } from "src/context/AuthContext";
import { useLoginUser, useLoginGuest } from "src/queryHooks/useAuth";
import { validateLoginField } from "src/utils/validationWithYup";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { mutate: loginUser } = useLoginUser();
  const { mutate: loginGuest } = useLoginGuest();

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

  interface State extends LoginParams {
    emailError: string;
    passwordError: string;
    requestError: string;
  }

  const [state, setState] = React.useState<State>({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    requestError: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // console.log("RENDER Login Form", { state });

  const { currentUser } = useAuthContext();

  React.useEffect(() => {
    if (currentUser) {
      navigate("/admin");
    }
    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { email, password } = state;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorName = `${name}Error`;

    setState({ ...state, [name]: value, [errorName]: "", requestError: "" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ ...state, requestError: "" });

    const emailError = await validateLoginField({
      key: "email",
      value: state.email,
    });
    const passwordError = await validateLoginField({
      key: "password",
      value: state.password,
    });

    setState({ ...state, emailError, passwordError: passwordError });

    if (!emailError && !passwordError) {
      handleLogin({ email: state.email, password: state.password });
    }
  };

  const handleGuestLogin = (event: React.FormEvent) => {
    console.log("Submit clicked");
    event.preventDefault();
    try {
      loginGuest(
        {},
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

  const handleLogin = async (loginParams: LoginParams) => {
    // todo: add validation with Yup

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
          const message = error && error.data ? error.data?.message : "";
          if (message) {
            setState({ ...state, requestError: message });
          }
        },
      }
    );
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
            <Styled.FieldContainer>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
                sx={textFieldStyles}
                error={Boolean(state.emailError)}
                helperText={Boolean(state.emailError) ? state.emailError : ""}
              />
            </Styled.FieldContainer>
            <Styled.FieldContainer>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                sx={textFieldStyles}
                error={Boolean(state.passwordError)}
                helperText={
                  Boolean(state.passwordError) ? state.passwordError : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Styled.FieldContainer>
            <Styled.Error>
              {state.requestError ? <p>{state.requestError}</p> : null}
            </Styled.Error>
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
              <Styled.Button onClick={handleGuestLogin}>
                Log in as Guest
              </Styled.Button>
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
    ${[t.pb(4), t.pt(3), t.my(4)]}
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 86%;
    margin-right: 7%;
    margin-left: 7%;
    height: 418px;

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
    ${[t.pb(4), t.pt(4)]}
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `;
});

Styled.FieldContainer = styled.div(() => {
  return css`
    label: Login_FieldContainer;
    height: 96px;
    div {
      width: 100%;
    }
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

Styled.Error = styled.div(() => {
  return css`
    height: 28px;

    p {
      font-size: 0.875rem;
      color: red;
    }
  `;
});
