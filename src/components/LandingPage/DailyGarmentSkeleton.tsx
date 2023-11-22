import React from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

interface DailyGarmentSkeletonProps {}

const DailyGarmentSkeleton: React.FC<DailyGarmentSkeletonProps> = () => {
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <Skeleton
        variant="text"
        sx={{
          fontSize: "1.75rem",
          bgcolor: "rgba(211, 217, 229, 0.5)",
          width: mediumScreen ? "calc((100vh - 160px) * 0.82)" : "30%",
          marginBottom: mediumScreen ? "0px" : "3%",
          marginTop: "26px",
        }}
      />
      <Skeleton
        variant="rectangular"
        width={mediumScreen ? "calc((100vh - 160px) * 0.82)" : "34%"}
        height={
          mediumScreen ? "calc((100vh - 160px) * 0.95)" : "calc(100vh - 160px)"
        }
        sx={{
          bgcolor: "rgba(211, 217, 229, 0.5)",
          borderRadius: "8px",
          mx: "20px",
          my: "12px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: mediumScreen ? "calc((100vh - 160px) * 0.82)" : "30%",
        }}
      >
        <Skeleton
          variant="text"
          sx={{
            fontSize: "2rem",
            bgcolor: "rgba(211, 217, 229, 0.5)",
            width: "100%",
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1.15rem",
            bgcolor: "rgba(211, 217, 229, 0.5)",
            width: "66%",
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1.15rem",
            bgcolor: "rgba(211, 217, 229, 0.5)",
            width: "66%",
          }}
        />
      </div>
    </>
  );
};

export default DailyGarmentSkeleton;
