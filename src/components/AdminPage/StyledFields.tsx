import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/system";

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  "& .MuiFilledInput-root": { color: theme.palette.primary.main },
  "& input:-webkit-autofill": {
    WebkitTextFillColor: theme.palette.primary.main,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  "& .MuiFilledInput-root": { color: theme.palette.primary.main },
  "& input:-webkit-autofill": {
    WebkitTextFillColor: theme.palette.primary.main,
  },
}));

export const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  margin: "8px 0",
  "& .MuiFilledInput-root": { color: theme.palette.primary.main },
  "& input:-webkit-autofill": {
    WebkitTextFillColor: theme.palette.primary.main,
  },
}));