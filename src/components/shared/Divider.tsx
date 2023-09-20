import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface DividerProps {
  color: string;
};

const Divider: React.FC<DividerProps> = (props) => {
  return (
    <Styled.Divider color={props.color}>
    </Styled.Divider>
  );
};

export default Divider;

let Styled: any;
Styled = {};

Styled.Divider = styled.div((props: any) => {
  return css`
    label: Divider;
    height: 1px;
    width: 100%;
    background-color: ${props.color};
  `;
});
