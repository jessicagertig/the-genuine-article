import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

interface AccordianProps {
  text: string | any;
  dark: boolean;
}

const Accordian: React.FC<AccordianProps> = props => {
  const { text, dark } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);

  const textRef = React.useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const colors = {
    primaryText: dark ? "white" : "#172a4f",
    textReverse: dark ? "#172a4f" : "white",
    background: dark ? "#020b1c" : "white",
    backgroundTransparent: dark ? "rgba(2,11,28,0)" : "rgba(255,255,255,0)",
    buttonBorder: dark ? "rgba(211, 217, 229, 0.3)" : "rgba(76, 95, 128, 0.4)",
  };

  React.useEffect(() => {
    if (textRef && textRef.current) {
      const scrollHeight = textRef.current.scrollHeight;
      const clientHeight = textRef.current.clientHeight;
      if (scrollHeight > 245 || clientHeight < scrollHeight) {
        setHasOverflow(true);
      }
    }
    //text must be a dependency or else it will not recalculate
  }, [textRef?.current?.scrollHeight, text]);

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
    borderColor: colors.buttonBorder,
    color: colors.primaryText,
    textTransform: "none",
    px: 2,
    fontSize: isMobile ? "1rem" : "0.875rem",
    "&:hover": {
      color: colors.textReverse,
      backgroundColor: colors.primaryText,
      fontSize: "0.9rem",
    },

    "& .MuiButton-endIcon": {
      color: colors.primaryText,
    },

    "&:hover .MuiButton-endIcon": {
      color: colors.textReverse,
      fontSize: "0.9rem",
    },
  };

  const overflowClass = hasOverflow ? "hidden" : "not-hidden";
  const activeClass = isOpen ? "active" : "inactive";

  return (
    <Styled.Container>
      <Styled.TextContainer>
        <div ref={textRef} className={`${overflowClass} ${activeClass}`}>
          {text}
        </div>
      </Styled.TextContainer>
      {hasOverflow ? (
        <Styled.AccordianContainer colors={colors}>
          <div className={concealerClassName}></div>
          <Styled.ButtonsContainer colors={colors}>
            <Styled.ButtonContainer
              className={isOpen ? "" : "active"}
              colors={colors}
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
              className={isOpen ? "active" : ""}
              colors={colors}
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
  const c = props.colors;
  return css`
    label: Accordian_DisplayContainer;
    position: relative;
    width: 100%;
    height: 100% .concealer-inactive {
      display: none;
    }

    .concealer-active {
      display: flex;
      justify-content: center;
      background-image: linear-gradient(
        ${c.backgroundTransparent},
        ${c.background}
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
  const c = props.colors;
  return css`
    label: Accordian_ButtonsContainer;
    ${t.mt(6)}
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${c.background};

    .active {
      display: flex;
    }
  `;
});

Styled.ButtonContainer = styled.div((props: any) => {
  const c = props.colors;
  return css`
    label: Accordian_ButtonContainer;
    width: 100%;
    height: 36px;
    display: none;
    justify-content: center;
    background-color: ${c.background};
  `;
});
