import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface AdminFooterProps {};

// basic format for a component
// replace "AdminFooter" with new component name throuhgout

const AdminFooter: React.FC<AdminFooterProps> = (props) => {

  return (
    <Styled.Container>
      <div>
        <h2>Content</h2>
      </div>
      <div>
        <p>Other content</p>
      </div>
    </Styled.Container>
  );
};

export default AdminFooter;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: AdminFooter_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(251, 233, 239, 0.28);
  `;
});
