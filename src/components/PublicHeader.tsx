import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type Props = {
  titleText?: string;
  descriptionText?: string;
  children?: React.ReactNode;
}

const PublicHeader = (props: Props) => {
  //will be a container for the page title, description, and any other "children" components I want to add
  return (
    <Styled.Heading>
      <Styled.Title>{props.titleText}</Styled.Title>
      <Styled.Description>{props.descriptionText}</Styled.Description>
      {props.children}
    </Styled.Heading>
  )
};

export default PublicHeader

// Styled Components
// =======================================================
let Styled: any
Styled = {}

Styled.Heading = styled.div((props) => {
  const t = props.theme;
  return css`
    label: Heading;
    ${t.pt(6)}
    position: sticky;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: ${t.color.blue_gray[100]};
  `
})

Styled.Title = styled.h1((props) => {
  const t = props.theme;
  return css`
    label: Title;
    ${t.text.normal}
    font-size: 3rem;
    color: ${t.color.blue[400]};
    text-shadow: 1px 0 ${t.color.blue_gray[400]}, -0.5px 0 ${t.color.blue_gray[400]}, 0 1px ${t.color.blue_gray[400]}, 0 -0.5px ${t.color.blue_gray[400]};
  `
})

Styled.Description = styled.p((props) => {
  const t = props.theme;
  return css`
    label: Description;
    ${[t.text.heavy, t.text.xxl, t.pb(10)]}
    color: ${t.color.blue_gray[600]};
    text-shadow: 0.5px 0 ${t.color.blue_gray[600]}, -0.5px 0 ${t.color.blue_gray[600]}, 0 0.5px ${t.color.blue_gray[600]}, 0 -0.5px ${t.color.blue_gray[600]};
  `
})