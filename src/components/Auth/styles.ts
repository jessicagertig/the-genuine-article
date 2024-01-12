const textFieldStyles = {
  marginBottom: 1,
  marginTop: 1,
  "& .MuiOutlinedInput-root": {
    color: "#223F7C",
    backgroundColor: "white",
    fontSize: "1rem",
    "& .MuiInputAdornment-root": {
      width: "40px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid rgba(34, 63, 124, .6)`,
      borderRadius: "4px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid #223F7C`,
    },
    "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
      border: `2px solid #223F7C`,
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    color: "#020b1c",
    fontWeight: "semi-bold",
  },
};

export default textFieldStyles;
