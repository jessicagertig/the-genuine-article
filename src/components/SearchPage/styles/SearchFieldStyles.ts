import { alpha } from "@mui/system";

export const mainSearchStyles = {
    width: "100%",
    margin: "8px 0",
    "& .MuiOutlinedInput-root": {
      color: "rgba(34, 63, 124, 1)",
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        border: `2px solid rgba(34, 63, 124, 0.7)`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `2px solid rgba(34, 63, 124, 0.7)`,
      },
      // "&.Mui-focusVisible, &.Mui-active": {
      //   border: `2px solid rgba(34, 63, 124, 0.7)`,
      // }
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      backgroundColor: "rgba(175, 187, 207, 0.2)",
    },
    "& .MuiIconButton-root": {
      color: `rgba(34, 63, 124, 0.7)`,
      backgroundColor: "white",
      "&:hover": {
        color: `rgba(34, 63, 124, 1)`,
      },
    },
    "& input:-webkit-autofill": {
      WebkitTextFillColor: "rgba(34, 63, 124, 0.7)",
    },
    "& input:-internal-autofill-selected": {
      backgroundColor: "rgba(175, 187, 207, 0.2)",
      border: "2px solid rgba(175, 187, 207, 0.2)",
    },
};
