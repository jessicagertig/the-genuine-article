import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const query = searchParams.get("query");
    if (query && query !== "") {
      setSearchTerm(query);
      setShowClearIcon("flex");
    }
  }, []);

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
      <FormControl
        sx={{ width: "100%", display: "flex", flexDirection: "row" }}
      >
        <TextField
          size="medium"
          variant="outlined"
          value={searchTerm}
          onChange={handleChange}
          sx={styles}
          placeholder="Search by keyword"
          InputProps={{
            style: {
              height: "40px",
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
            sx={{ color: "white", mx: "4px", mt: "-2px", width: "40px", height: "40px"}}
            onClick={handleSubmitSearch}
          >
            <SearchOutlinedIcon />
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

Styled.ButtonContainer = styled.div((props) => {
  const t = props.theme;
  return css`
    label: SearchBar_ButtonContainer;
    width: 48px;
    height: 40px;
    ${[t.my(2)]};
    border-radius: 0 4px 4px 0;
    background-color: #172a4f;
    border: 2px solid #172a4f;
  `;
});
