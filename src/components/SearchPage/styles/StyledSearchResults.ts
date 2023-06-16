import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const StyledSearchResults = styled.div(props => {
  const t = props.theme;
  return css`
    label: SearchResults;
    ${[t.p(2), t.mx(6)]}
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
  `;
});
