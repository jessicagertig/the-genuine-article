import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { GarmentData, PinterestBoard } from "src/types";
import {
  useCreatePinterestBoard,
  usePinterestPin,
  useCreatePinterestPin,
} from "src/queryHooks/useIntegrations";
import CreatePinterestBoardForm from "./CreatePinterestBoardForm";

interface PinterestModalProps {
  garment: GarmentData | null;
  boards: PinterestBoard[];
  open: boolean;
  onCancel: () => void;
  onSelectBoard: (boardId: string) => void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
};

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonContainer = styled.div`
  visibility: hidden;
`;

const ListItemWrapper = styled.div`
  &:hover ${ButtonContainer} {
    visibility: visible;
  }
`;

function truncateDescription(description: string): string {
  return description.length > 40
    ? `${description.substring(0, 40)}...`
    : description;
}

function PinterestModal({
  garment,
  boards,
  open,
  onCancel,
  onSelectBoard,
}: PinterestModalProps) {
  const { mutate: createBoard } = useCreatePinterestBoard();
  const { mutate: createPin } = useCreatePinterestPin();
  const [boardId, setBoardId] = React.useState("");
  const [pinId, setPinId] = React.useState("");
  const [newBoardState, setNewBoardState] = useState({
    name: "",
    description: "",
    secret: false,
  });
  const [showForm, setShowForm] = useState(false);

  const onChangePinterestBoard = (name: string, value: string | boolean) => {
    setNewBoardState(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const board = {
      name: newBoardState.name,
      description: newBoardState.description,
      privacy: newBoardState.secret,
    };
    createBoard({ board: board });
    setShowForm(false);
  };

  const logBoardsOnClick = () => {
    console.log("BOARDS");
  };

  const createPinOnClick = () => {
    const boardId = "101471866543589332";
    const itemId = garment?.id;
    console.log("CREATE PIN");
    createPin({ itemId, boardId });
  };

  const setBoardIdOnClick = () => {
    const boardId = "101471866543589332";

    console.log("GET BOARD");
    setBoardId(boardId);
  };

  const fetchPinOnClick = () => {
    const pinId = "101471797848011244";

    console.log("GET PIN");
    setPinId(pinId);
  };

  const toggleShowForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="pinterest-modal-title"
      aria-describedby="pinterest-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" flexDirection="row" flex="1" p={2}>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            width="33%"
            mr={2}
          >
            <StyledImage src={garment?.imageUrls?.mainImageUrl} alt="Garment" />
            <Typography variant="h6" mt={2}>
              {garment?.garmentTitle}
            </Typography>
            <Typography variant="body2">
              {truncateDescription(garment?.description || "")}
            </Typography>
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            width="67%"
            ml={2}
          >
            {showForm ? (
              <CreatePinterestBoardForm
                onChange={onChangePinterestBoard}
                newBoardState={newBoardState}
              />
            ) : (
              <>
                <TextField fullWidth label="Search" variant="outlined" />
                <List
                  style={{ overflow: "auto", maxHeight: 300, marginTop: 8 }}
                >
                  {boards.map(board => (
                    <ListItemWrapper key={board.id}>
                      <StyledListItem
                        onMouseEnter={() => onSelectBoard(board.id)}
                      >
                        <Avatar
                          src={board.media.image_cover_url}
                          variant="rounded"
                          sx={{ marginRight: 2 }}
                        />
                        <ListItemText primary={board.name} />
                        <ButtonContainer>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ backgroundColor: "red" }}
                            startIcon={<PinterestIcon />}
                          >
                            Pin it
                          </Button>
                        </ButtonContainer>
                      </StyledListItem>
                    </ListItemWrapper>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={showForm ? toggleShowForm : onCancel}
            endIcon={<CancelIcon />}
          >
            {showForm ? "Cancel" : "Close"}
          </Button>
          {showForm ? (
            <Button variant="contained" color="error" onClick={onSubmit}>
              Save Board
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={toggleShowForm}
              endIcon={<AddIcon />}
            >
              Create Board
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default PinterestModal;