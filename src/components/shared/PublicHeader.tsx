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
    ${[t.pt(10), t.px(0)]}
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(211, 217, 229, 0.5);

    ${t.mq.xl} {
      height: 260px;
    }
  `
})

Styled.Title = styled.h1((props) => {
  const t = props.theme;
  return css`
    label: Title;
    ${[t.pb(8)]}
    font-size: 2rem;
    font-weight: 600;
    color: ${t.color.blue[500]};
    letter-spacing: 0.07rem;

    ${t.mq.xl} {
      font-size: 2.5rem;
    }
  `
})

Styled.Description = styled.p((props) => {
  const t = props.theme;
  return css`
    label: Description;
    ${[t.px(10), t.text.bold]}
    font-size: 1.187rem;
    color: ${t.color.blue_gray[700]};
    text-align: center;

    ${t.mq.xl} {
      ${t.text.xl}
      } 
  `
})