import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useTrail, useSpring, animated } from "@react-spring/web";

import useIntersectionObserver from "src/hooks/useIntersectionObserver";

interface BottomContentProps {}

const BottomContent: React.FC<BottomContentProps> = props => {
  const triggerRef = React.useRef<HTMLDivElement>(null!);

  const dataRef = useIntersectionObserver(triggerRef, { freezeOnceVisible: false });

  const appear = useSpring({
    delay: 1000,
    config: { duration: 400 },
    from: {
      opacity: 0,
      zIndex: -1,
    },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      zIndex: dataRef?.isIntersecting ? 1 : -1,
    }
  })

  return (
    <Styled.Container ref={triggerRef}>
      <Styled.ContentContainer>
        <Styled.AlignmentContainer>
          <Styled.Text>
            <h2>Discover the Collection</h2>
          </Styled.Text>
          <Styled.Button style={appear}>
            <h3>Explore</h3>
            <div className="placeHolder"></div>
          </Styled.Button>
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

Styled.ContentContainer = styled(animated.div)(props => {
  const t = props.theme;
  return css`
  label: BottomContent_ContentContainer;
  ${[t.py(4), t.px(4)]};
  display: flex;
  width: 100%;
  align-items: center;

  ${t.mq.gxl} {
    width: 84%;
    margin-right: 8%;
    margin-left: 8%;
    ${t.py(0)};
  }

  ${t.mq.xxl} {
    width: 76%;
    margin-right: 12%;
    margin-left: 12%;
  }
  `
})

Styled.AlignmentContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: BottomContent_Container;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    background-color: #020b1c;
    ${t.mt(3)};
  `;
});

Styled.Text = styled.div(props => {
  const t = props.theme;
  return css`
    label: BottomContent_Text;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;

    h2 {
      font-size: 2rem;
      color: white;
      letter-spacing: 0.1rem;
      line-height: 4rem;
      font-family: "Sorts Mill Goudy";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;  

      ${t.mq.xxs} {
        font-size: 3rem;
      }
    }
  `;
});

Styled.Button = styled(animated.div)(props => {
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

  .placeHolder {
    width: 32px;
    height: 2px;
    border-bottom: 2px solid #020b1c;
  }
  `
})