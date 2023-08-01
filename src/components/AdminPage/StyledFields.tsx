import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled, alpha } from "@mui/system";

const createRootStyles = (theme: any): any => {
  return {
    width: "100%",
    margin: "8px 0",
    "& .MuiFilledInput-root": {
      color: theme.palette.primary.main,
      backgroundColor: "rgba(175, 187, 207, 0.2)",
      "&:hover": {
        backgroundColor: "rgba(175, 187, 207, 0.4)",
        "&:before": {
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.9)}`,
        },
      },
      "&:before": {
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.66)}`,
      },
    },
    "& input:-webkit-autofill": {
      WebkitTextFillColor: theme.palette.primary.main,
    },
    "& input:-internal-autofill-selected": {
      backgroundColor: "rgba(175, 187, 207, 0.2)",
    },
  };
};

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) =>
  createRootStyles(theme)
);

export const StyledTextField = styled(TextField)(({ theme }) =>
  createRootStyles(theme)
);

export const StyledDatePicker = styled(DatePicker)(({ theme }) =>
  createRootStyles(theme)
);

// SOME MUI ROOT STYLE CLASSNAMES AS COPIED - most properties removed

// MuiInputBase-root-MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before {
//   border-bottom: 1px solid rgba(0, 0, 0, 0.87);
// }

// css-1rgy9zg-MuiInputBase-root-MuiFilledInput-root:before {
//   border-bottom: 1px solid rgba(0, 0, 0, 0.42);
// }

// .css-1xpn62i-MuiFormLabel-root-MuiInputLabel-root {
//   color: rgba(0, 0, 0, 0.6);
//   font-family: Bellota Text,sans-serif;
//   z-index: 1;
//   pointer-events: none;
// }
