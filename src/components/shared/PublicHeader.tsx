import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = {
  titleText?: string;
  descriptionText?: string;
  children?: React.ReactNode;
};

const PublicHeader = (props: Props) => {
  const { titleText, descriptionText, children } = props;
  //will be a container for the page title, description, and any other "children" components I want to add
  return (
    <>
      <Styled.Heading>
        <Styled.Title>{titleText}</Styled.Title>
      </Styled.Heading>
      {descriptionText || children ? (
        <Styled.Container>
          <Styled.Description>{descriptionText}</Styled.Description>
          {children}
        </Styled.Container>
      ) : null}
    </>
  );
};

export default PublicHeader;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Heading = styled.div(props => {
  const t = props.theme;
  return css`
    label: Heading;
    ${[t.pt(8), t.px(0)]}
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(211, 217, 229, 0.5);

    ${t.mq.md} {
      height: 150px;
    }
  `;
});

Styled.Title = styled.h1(props => {
  const t = props.theme;
  return css`
    label: Title;
    ${[t.pb(8)]}
    font-size: 1.375rem;
    color: ${t.color.blue[400]};
    letter-spacing: 0.07rem;
    text-transform: uppercase;

    ${t.mq.md} {
      font-size: 1.65rem;
    }
  `;
});

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: ContentContainer;
    ${[t.pt(2), t.px(0)]}
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(211, 217, 229, 0.5);
  `;
});

Styled.Description = styled.p(props => {
  const t = props.theme;
  return css`
    label: Description;
    ${[t.px(10), t.text.bold]}
    font-size: 1.187rem;
    color: ${t.color.blue_gray[700]};
    text-align: center;
  `;
});
