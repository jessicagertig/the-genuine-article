import React from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LoadingBar = (): React.ReactElement => {
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} sx={{width: "100%", height: "4px"}}/>
    </Box>
  );
}

export default LoadingBar;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    ${t.pt(6)}
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
});