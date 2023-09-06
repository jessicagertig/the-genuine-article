export const mainSearchStyles = {
  width: "calc(100% - 48px)",
  margin: "8px 0",
  "& .MuiOutlinedInput-root": {
    color: "#172a4f",
    backgroundColor: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2px solid #172a4f`,
      borderRadius: "4px 0 0 4px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid #172a4f`,
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: "rgba(175, 187, 207, 0.1)",
  },
  "& .MuiIconButton-root": {
    color: `#172a4f`,
    "&:hover": {
      color: `#172a4f`,
    },
  },
  "& input:-webkit-autofill": {
    WebkitTextFillColor: "#172a4f",
  },
  "& input:-internal-autofill-selected": {
    backgroundColor: "rgba(175, 187, 207, 0.1)",
    border: "2px solid rgba(175, 187, 207, 0.1)",
  },
};
