export const mainSearchStyles = {
    width: "calc(100% - 48px)",
    margin: "8px 0",
    "& .MuiOutlinedInput-root": {
      color: "rgba(23, 42, 79, 0.9)",
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        border: `2px solid rgba(23, 42, 79, 0.9)`,
        borderRadius: "4px 0 0 4px",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `2px solid rgba(23, 42, 79, 0.9)`,
      },
      // "&.Mui-focusVisible, &.Mui-active": {
      //   border: `2px solid rgba(23, 42, 79, 0.9)`,
      // }
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      backgroundColor: "rgba(175, 187, 207, 0.1)",
    },
    "& .MuiIconButton-root": {
      color: `rgba(23, 42, 79, 0.9)`,
      "&:hover": {
        color: `rgba(23, 42, 79, 0.9)`,
      },
    },
    "& input:-webkit-autofill": {
      WebkitTextFillColor: "rgba(23, 42, 79, 0.9)",
    },
    "& input:-internal-autofill-selected": {
      backgroundColor: "rgba(175, 187, 207, 0.1)",
      border: "2px solid rgba(175, 187, 207, 0.1)",
    },
};
