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
      <FormControl sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
        <TextField
          size="medium"
          variant="outlined"
          value={searchTerm}
          onChange={handleChange}
          sx={styles}
          placeholder="Search by keyword"
          InputProps={{
            style: {
              height: "40px"
            },
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
        <Styled.ButtonContainer>
          <IconButton
            aria-label="trigger-search"
            type="submit"
            sx={{ color: "white", mx: "4px" }}
            onClick={handleSubmitSearch}
          >
            <SearchOutlinedIcon />
            {/* <Styled.Text>
              Search
            </Styled.Text> */}
          </IconButton>
        </Styled.ButtonContainer>
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
    label: SearchBar_Container;
    width: 100%;
  `;
});

Styled.ButtonContainer = styled.div(() => {
  return css`
    label: SearchBar_ButtonContainer;
    width: 48px;
    height: 40px;
    margin: 8px 0;
    border-radius: 0 4px 4px 0;
    background-color: rgba(23, 42, 79, 0.9); 
    border-bottom: 2px solid rgba(23, 42, 79, 0.9);
    border-top: 2px solidrgba(23, 42, 79, 0.9);
    border-right: 2px solid rgba(23, 42, 79, 0.9);
  `;
});

Styled.Text = styled.p(() => {
  return css`
    label: SearchBar_Text;
    height: 52px;
    margin: 8px 8px;
    font-family: "bellota text";
    font-size: 1.5rem;
  `;
})