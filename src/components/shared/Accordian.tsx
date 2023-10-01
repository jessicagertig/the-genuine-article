import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import useResizeObserver from "src/hooks/useResizeObserver";

interface AccordianProps {
  text: string | any;
  dark: boolean;
}

const Accordian: React.FC<AccordianProps> = props => {
  const { text, dark } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const { ref: sizeRef, height: varHeight } = useResizeObserver();

  const textRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (textRef && textRef.current) {
      const scrollHeight = textRef.current.scrollHeight;
      const clientHeight = textRef.current.clientHeight;
      if (scrollHeight > 245 || clientHeight < scrollHeight) {
        setHasOverflow(true);
      } else if (scrollHeight === 245 && !(clientHeight < scrollHeight)) {
        setHasOverflow(false);
        setIsOpen(false);
      }
      if (varHeight && varHeight <= 240 && isOpen) {
        setHasOverflow(false);
        setIsOpen(false);
      }
    }
    //text must be a dependency or else it will not recalculate
    // isOpen should not be included since its changed in the useEffect
    // eslint-disable-next-line
  }, [textRef?.current?.scrollHeight, text, varHeight]);

  const handleClickOpen = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleClickClose = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsOpen(false);
  };

  const concealerClassName = isOpen ? "concealer-inactive" : "concealer-active";

  const buttonStyles = {
    borderColor: dark ? "rgba(211, 217, 229, 0.3)" : "rgba(76, 95, 128, 0.4)",
    color: dark ? "white" : "#020b1c",
    textTransform: "none",
    px: 2,
    fontSize: isMobile ? "1rem" : "0.875rem",
    "&:hover": {
      color: dark ? "#020b1c" : "white",
      backgroundColor: dark ? "white" : "#020b1c",
      fontSize: "0.9rem",
    },

    "& .MuiButton-endIcon": {
      color: dark ? "white" : "#020b1c",
    },

    "&:hover .MuiButton-endIcon": {
      color: dark ? "#020b1c" : "white",
      fontSize: "0.9rem",
    },
  };

  const overflowClass = hasOverflow ? "hidden" : "not-hidden";
  const activeClass = isOpen ? "active" : "inactive";

  return (
    <Styled.Container>
      <Styled.TextContainer ref={sizeRef}>
        <div ref={textRef} className={`${overflowClass} ${activeClass}`}>
          {text}
        </div>
      </Styled.TextContainer>
      {hasOverflow ? (
        <Styled.AccordianContainer dark={dark}>
          <div className={concealerClassName}></div>
          <Styled.ButtonsContainer dark={dark}>
            <Styled.ButtonContainer
              className={isOpen ? overflowClass : `${overflowClass} active`}
              dark={dark}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                size="small"
                endIcon={<AddOutlinedIcon />}
                sx={buttonStyles}
              >
                Read more
              </Button>
            </Styled.ButtonContainer>
            <Styled.ButtonContainer
              className={isOpen ? `${overflowClass} active` : overflowClass}
              dark={dark}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickClose}
                size="small"
                endIcon={<RemoveOutlinedIcon />}
                sx={buttonStyles}
              >
                Read less
              </Button>
            </Styled.ButtonContainer>
          </Styled.ButtonsContainer>
        </Styled.AccordianContainer>
      ) : null}
    </Styled.Container>
  );
};

export default Accordian;

/* Styled Components
======================================================= */
let Styled: any;
Styled = {};

Styled.Container = styled.div(() => {
  return css`
    label: Accordian_Container;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});

Styled.AccordianContainer = styled.div((props: any) => {
  const dark = props.dark;
  return css`
    label: Accordian_DisplayContainer;
    position: relative;
    width: 100%;

    .concealer-inactive {
      display: none;
    }

    .concealer-active {
      display: flex;
      justify-content: center;
      background-image: linear-gradient(
        ${dark ? "rgba(2,11,28,0)" : "rgba(255,255,255,0)"},
        ${dark ? "#020b1c" : "white"}
      );
      height: 90px;
      position: absolute;
      left: 0;
      top: -90px;
      width: 100%;
    }
  `;
});

Styled.TextContainer = styled.div(() => {
  return css`
    label: Accordian_TextContainer;
    width: 100%;
    height: auto;
    display: block;
    justify-content: center;

    .hidden.inactive {
      height: 245px;
      overflow: hidden;
    }

    .not-hidden {
      overflow: auto;
      height: 100%;
    }

    .active {
      height: 100%;
    }
  `;
});

Styled.ButtonsContainer = styled.div((props: any) => {
  const t = props.theme;
  const dark = props.dark;
  return css`
    label: Accordian_ButtonsContainer;
    ${t.mt(6)}
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${dark ? "#020b1c" : "white"};

    .active {
      display: flex;
    }

    .not-hidden {
      display: none;
    }
  `;
});

Styled.ButtonContainer = styled.div((props: any) => {
  const dark = props.dark;
  return css`
    label: Accordian_ButtonContainer;
    width: 100%;
    height: 36px;
    display: none;
    justify-content: center;
    background-color: ${dark ? "#020b1c" : "white"};
  `;
});
