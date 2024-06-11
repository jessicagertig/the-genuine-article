// CreatePinterestBoardForm component
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
  newBoardState: {
    name: string;
    description: string;
    secret: boolean;
  };
}

function CreatePinterestBoardForm({
  onChange,
  newBoardState,
}: CreatePinterestBoardFormProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: boolean
  ) => {
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
      <ToggleButtonGroup
        exclusive
        value={newBoardState.secret}
        onChange={handleToggleChange}
      >
        <ToggleButton value={true}>Secret</ToggleButton>
        <ToggleButton value={false}>Public</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default CreatePinterestBoardForm;
