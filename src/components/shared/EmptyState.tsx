import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = props => {
  const { title, description } = props;

  return (
    <Styled.Container>
      <Styled.EmptyState>
        <ArticleOutlinedIcon fontSize="large" sx={{ color: "#172A4F" }} />
        <h2>{title}</h2>
        <p>{description}</p>
      </Styled.EmptyState>
    </Styled.Container>
  );
};

export default EmptyState;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: EmptyState_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
  `;
});

Styled.EmptyState = styled.div(({ theme }: { theme: Theme }) => {
  const t = theme;
  return css`
    label: EmptyState_Content;
    ${t.mb(10)}
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    border: 1px solid #223f7c;
    border-radius: 8px;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #172a4f;
      ${[t.mx(4), t.my(2)]}
      text-align: center;
    }

    p {
      font-family: "bellota text";
      font-size: 1rem;
      color: #223f7c;
      ${t.mb(4)}
      text-align: center;
    }
  `;
});
