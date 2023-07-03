import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import OutlinedButton from "src/components/shared/OutlinedButton";

type Props = {
  backPath?: string;
  toPath?: string;
  toText?: string;
  closePath?: string;
  actions?: React.ReactNode;
  pageTitle: string; 
};

const SecondaryNav = (props: Props) => {
  const { backPath, toPath, toText, closePath, actions, pageTitle } = props
  const navigate = useNavigate();

  const handleClickBack = () => {
    if (backPath !== undefined) {
      navigate(backPath);
    }
  };

  const handleClickTo = () => {
    if (toPath !== undefined) {
      navigate(toPath);
    }
  }

  return (
    <Styled.SecondaryNavContainer>
      <Styled.LeftButtonContainer>
        {backPath ? (
          <OutlinedButton
            hasStartIcon={true}
            iconType="back"
            onClick={handleClickBack}
            styles={{
              maxWidth: "100px",
              paddingRight: "8px",
              paddingLeft: "8px",
            }}
          >
            Back
          </OutlinedButton>
        ) : null}
      </Styled.LeftButtonContainer>
      <Styled.SecondaryNavHeader>
        <h2>{pageTitle}</h2>
      </Styled.SecondaryNavHeader>
      <Styled.RightButtonContainer>
        {toText && toPath ? (
          <OutlinedButton
            hasStartIcon={true}
            iconType="add"
            onClick={handleClickTo}
            styles={{
              maxWidth: "100px",
              paddingRight: "8px",
              paddingLeft: "8px",
            }}
          >
            {toText}
          </OutlinedButton>
        ) : null}
      </Styled.RightButtonContainer>
    </Styled.SecondaryNavContainer>
  );
};

export default SecondaryNav;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.SecondaryNavContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: SecondaryNavContainer;
    ${[t.mb(6), t.mt(12)]}
    margin-right: 2%;
    margin-left: 2%;
    width: 96%;
    display: flex;
    height: 48px;

    ${t.mq.xxl} {
      margin-right: 6%;
      margin-left: 6%;
      width: 88%;
    }
  `;
});

Styled.SecondaryNavHeader = styled.div(props => {
  const t = props.theme;
  return css`
    label: SecondaryNavHeader;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${t.mq.md} {
      width: 60%;
    }

    h2 {
      font-family: "bellota text";
      font-size: 24px;
      font-weight: 700;
      color: ${t.color.blue[700]};
      text-transform: uppercase;
      text-align: center;
    }
  `;
});

Styled.LeftButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    display: flex;
    justify-content: flex-start;
    width: 25%;

    ${t.mq.md} {
      width: 20%;
    }
  `;
});

Styled.RightButtonContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageButtonContainer;
    display: flex;
    justify-content: flex-end;
    width: 25%;

    ${t.mq.md} {
      width: 20%;
    }
  `;
});