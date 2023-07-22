import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "@mui/material/IconButton";

interface SearchProps {
  onChange: (value: string) => void;
  onSubmit: (searchTerm: string) => void;
  handleClearSearch: () => void;
  styles: any;
}

const SearchBar: React.FC<SearchProps> = ({
  onChange,
  onSubmit,
  handleClearSearch,
  styles,
}) => {
  const [showClearIcon, setShowClearIcon] = React.useState("none");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    onChange(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSubmitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted! value:", searchTerm);
    onSubmit(searchTerm);
  };

  const handleClickClear = (): void => {
    console.log("clicked the clear icon...");
    setSearchTerm("");
    setShowClearIcon("none");
    handleClearSearch();
  };

  return (
    <Styled.Form onSubmit={handleSubmitSearch}>
      <FormControl sx={{ width: "100%"}}>
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={handleChange}
          sx={styles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="trigger-search"
                  type="submit"
                  onClick={handleSubmitSearch}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" style={{ display: showClearIcon }}>
                <IconButton
                  aria-label="clear-search"
                  onClick={handleClickClear}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Styled.Form>
  );
};

export default SearchBar;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.Form = styled.form(() => {
  return css`
    label: SearchPageContainer;
    width: 100%;
  `;
});
