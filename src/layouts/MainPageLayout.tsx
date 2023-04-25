import React from 'react'
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import NavBar from '../components/NavBar';
import PublicHeader from '../components/PublicHeader';

type Props = {
  children: React.ReactNode;
}

const MainPageLayout = (props: Props) => {
  return (
    <Styled.MainPageContainer>
      <NavBar />
      <PublicHeader 
        titleText='The Genuine Article' 
        descriptionText='A collection of images of original historical clothing from the 19th century '
      />
      {props.children}
    </Styled.MainPageContainer>
  )
}

export default MainPageLayout

// Styled Components
// =======================================================
let Styled: any
Styled = {}

Styled.MainPageContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: MainPageContainer;
    ${t.pt(6)}
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
})