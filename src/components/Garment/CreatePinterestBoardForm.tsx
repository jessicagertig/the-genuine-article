import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
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
      <Typography variant="h6">Create board</Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        variant="outlined"
        onChange={handleChange}
      />
      <ToggleButtonGroup value={false} exclusive onChange={handleToggleChange}>
        <ToggleButton value={true}>Secret</ToggleButton>
      </ToggleButtonGroup>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Create
      </Button>
    </Box>
  );
}

export default CreatePinterestBoardForm;
