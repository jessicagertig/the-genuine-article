import React from 'react'
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

interface AccordianProps {
  text: string | any;
}

const Accordian: React.FC<AccordianProps> = (props) => {
  const { text } = props;
  const [isOpen, setIsOpen] = React.useState(false)
  const [hasOverflow, setHasOverflow] = React.useState(false)

  const textRef = React.useRef<HTMLDivElement>(null)

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(() => {
    if (textRef && textRef.current) {
      console.log("Text REF", textRef.current)
      console.log("scroll height", textRef.current.scrollHeight)
      const scrollHeight = textRef.current.scrollHeight;
      if (scrollHeight > 150) {
        setHasOverflow(true)
      } 
    }
  }, [textRef?.current?.scrollHeight, isOpen])

  const handleClickOpen = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsOpen(true)
  }

  const handleClickClose = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsOpen(false)
  }

  const concealerClassName = isOpen ? "concealer-inactive" : "concealer-active";
  
  const buttonStyles = {
    borderColor: "rgba(211, 217, 229, 0.3)",
    color: "white",
    textTransform: "none",
    px: 2,
    fontSize: isMobile ? "1rem" : "0.875rem",
    "&:hover": {
      color: "#172a4f",
      backgroundColor: "white",
      fontSize: "0.9rem",
    },

    "& .MuiButton-endIcon": {
      color: "white",
    },

    "&:hover .MuiButton-endIcon": {
      color: "#172a4f",
      fontSize: "0.9rem",
    }
  }

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
        <Styled.AccordianContainer>
          <div className={concealerClassName}>
          </div>
          <Styled.ButtonsContainer>
            <Styled.ButtonContainer className={isOpen ? "" : "active"}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                size="small"
                endIcon={<AddOutlinedIcon/>}
                sx={buttonStyles}
                >
                Read more
              </Button>
            </Styled.ButtonContainer>
            <Styled.ButtonContainer className={isOpen ? "active" : ""}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickClose}
                size="small"
                endIcon={<RemoveOutlinedIcon/>}
                sx={buttonStyles}
                >
                Read less
              </Button>
            </Styled.ButtonContainer>
          </Styled.ButtonsContainer>
        </Styled.AccordianContainer>
      ) : null}
    </Styled.Container>
  )
}

export default Accordian;

/* Styled Components
======================================================= */
let Styled: any;
Styled = {};

Styled.Container = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Accordian_Container;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${t.mq.md} {
    }
  `;
});

Styled.AccordianContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Accordian_DisplayContainer;
    position: relative;
    width: 100%;
    height: 100%

    ${t.mq.md} {
    }

    .concealer-inactive {
      display: none;
    }

    .concealer-active {
      display: flex;
      justify-content: center;
      background-image: linear-gradient(rgba(57,59,63,0),#172a4f);
      height: 90px;
      position: absolute;
      left: 0;
      top: -90px;
      width: 100%;
    }
  `;
})

Styled.TextContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Accordian_TextContainer;
    width: 100%;
    height: auto;
    display: block;
    justify-content: center;
    
    .hidden.inactive {
      height: 150px;
      overflow: hidden;
    }

    .not-hidden {
      overflow: auto;
      height: 100%;
    }

    .active {
      height: 100%;
    }

    ${t.mq.md} {
    }
  `;
});

Styled.ButtonsContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Accordian_ButtonsContainer;
    ${t.mt(6)}
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #172a4f;

    .active {
      display: flex;
    }

    ${t.mq.md} {
    }
  `;
});

Styled.ButtonContainer = styled.div((props: any) => {
  const t = props.theme;
  return css`
    label: Accordian_ButtonContainer;
    width: 100%;
    height: 36px;
    display: none;
    justify-content: center;
    background-color: #172a4f;
  `;
});