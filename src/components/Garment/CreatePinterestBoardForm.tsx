import React from "react";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";

interface CreatePinterestBoardFormProps {
  onChange: (name: string, value: string | boolean) => void;
  onSubmit: () => void;
}

function CreatePinterestBoardForm({
  onChange,
  onSubmit,
}: CreatePinterestBoardFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: boolean
  ) => {
    console.log('Secret?', value)
    onChange("secret", value);
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        required
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        onChange={handleChange}
      />
      <ToggleButtonGroup
        exclusive
        onChange={handleToggleChange}
        aria-label="Secret"
      >
        <ToggleButton value={true} aria-label="Secret">
          Secret
        </ToggleButton>
      </ToggleButtonGroup>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Create Board
      </Button>
    </Box>
  );
}

export default CreatePinterestBoardForm;
