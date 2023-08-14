import React, { useState, ChangeEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login: React.FC = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submit clicked");
  };

  const textFieldStyles = {
    marginBottom: 2,
    marginTop: 1,
    "& .MuiOutlinedInput-root": {
      color: "#223F7C",
      backgroundColor: "white",
      fontSize: "1rem",
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid rgba(34, 63, 124, .6)`,
        borderRadius: "4px",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `2px solid #223F7C`,
      },
      "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
        border: `2px solid #223F7C`,
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      color: "#172a4f",
      fontWeight: "semi-bold",
    },
  };

  return (
    <Styled.Container>
      <Styled.Form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          sx={textFieldStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          sx={textFieldStyles}
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
    ${t.m(2)}
    height: calc(100vh - 48px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid blue;

    ${t.mq.md} {
      height: calc(100vh - 90px);
    }
  `;
});

Styled.Form = styled.form(props => {
  const t = props.theme;
  return css`
    label: Login_Form;
    display: flex;
    flex-direction: column;
    border: 2px solid blue;

    ${t.mq.sm} {
      ${[t.p(4)]}
      width: 400px;
      height: 300px;
    }
  `;
});
