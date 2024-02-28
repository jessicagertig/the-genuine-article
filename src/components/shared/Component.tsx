import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

interface ComponentProps {};

// basic format for a component
// replace "Component" with new component name throughout

const Component: React.FC<ComponentProps> = (props) => {

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

export default Component;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div((theme: Theme)=> {
  const t = theme;
  return css`
    label: Component_Container;
    ${t.m(2)}
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  `;
});
