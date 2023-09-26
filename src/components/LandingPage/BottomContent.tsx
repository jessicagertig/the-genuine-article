import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BottomContentProps {}

const BottomContent: React.FC<BottomContentProps> = () => {

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        <Styled.AlignmentContainer>
          <Styled.Text>
            <h2>Discover</h2>
            <h2>the </h2>
            <h2>Collection</h2>
          </Styled.Text>
          <Link to="/garments" target="_blank">
          <Styled.Button>
            <h3>Explore</h3>
              <div className="line"></div>
              <ArrowForwardIcon/>
          </Styled.Button>
          </Link>
        </Styled.AlignmentContainer>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default BottomContent;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Container = styled.div(props => {
  const t = props.theme;
  return css`
    label: BottomContent_Container;
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #020b1c;
  `;
});

Styled.ContentContainer = styled.div(props => {
  const t = props.theme;
  return css`
  label: BottomContent_ContentContainer;
  ${[t.py(4), t.px(4)]};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${t.mq.xl} {
    padding-right: 2%;
    padding-left: 2%;
    ${t.py(0)};
  }

  ${t.mq.gxl} {
    padding-right: 5%;
    padding-left: 5%;
  }
  `
})

Styled.AlignmentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: BottomContent_Container;
    width: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #020b1c;
    ${t.mt(3)};

    ${t.mq.sm} {
      align-items: flex-end;
      width: 70%;
      max-width: 500px;
    }

    ${t.mq.md} {
      width: 60%;
    }

    ${t.mq.xl} {
      width: 60%; 
    }

    ${t.mq.xxl} {
      width: 50%;
    }
  `;
});

Styled.Text = styled.div(props => {
  const t = props.theme;
  return css`
    label: BottomContent_Text;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${t.mq.xxs} {
      flex-direction: row;
    }

    ${t.mq.sm} {
      justify-content: flex-end;
    }

    h2 {
      font-size: 1.675rem;
      line-height: 2.5rem;
      color: white;
      letter-spacing: 0.1rem;
      font-family: "Sorts Mill Goudy";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;  

      ${t.mq.xxs} {
        line-height: 3.5rem;
        font-size: calc(26px + 22 * ((100vw - 320px) / 880));
        padding-right: calc(8px + 8 * ((100vw - 320px) / 880));

        &:nth-of-type(3) {
          padding-right: 0;
        }
      }

      ${t.mq.xl} {
        font-size: 3rem;
        ${t.pr(4)};

        &:nth-of-type(3) {
          padding-right: 0;
        }
      }
    }
  `;
});

Styled.Button = styled.div(props => {
  const t = props.theme;
  return css`
  label: BottomContnet_ExploreButton;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 4rem;
  background-color: white;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
  ${[t.mt(6)]};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transition: all 0.2s ease-in-out;
  }

  h3 {
  font-size: 1.75rem;
  color: #020b1c;
  line-height: 2.75rem;
  font-family: "Bellota Text";
  text-transform: uppercase;
  ${t.mr(2)}

    ${t.mq.xxs} {
      font-size: 1.75rem;
    }
  }

  .line {
    width: 14px;
    height: 2px;
    background-color: #020b1c;
    ${t.ml(1)};
  }

  svg {
    margin-left: -4px;
  }
  `
})