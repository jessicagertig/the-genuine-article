// import React from "react";
// import styled from "@emotion/styled";
// import { css } from "@emotion/react";

// import DialogModal from "src/components/shared/DialogModal";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Button,
// } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
// import PinterestIcon from "@mui/icons-material/Pinterest";

// import { GarmentData, PinterestBoard } from "src/types";

// interface PinterestModalProps {
//   garment: GarmentData | null;
//   boards: PinterestBoard[];
//   open: boolean;
//   onCancel: () => void;
//   onSelectBoard: (boardId: string) => void;
// }

// const PinterestModal: React.FC<PinterestModalProps> = props => {
//   const { garment, boards, open, onCancel, onSelectBoard } = props;

//   const handleSelectBoard = (boardId: string) => {
//     onSelectBoard(boardId);
//   };

//   return (
//     <DialogModal
//       open={open}
//       dialogTitle="Save to Pinterest"
//       onCancel={onCancel}
//       full={true}
//     >
//       <Styled.ModalContent>
//         <Styled.GarmentContainer>
//           <Styled.GarmentImage src={garment?.imageUrls?.mainImageUrl} />
//         </Styled.GarmentContainer>
//         <Styled.BoardsContainer>
//           <Styled.BoardsTitle>Select a Pinterest Board</Styled.BoardsTitle>
//           <Styled.BoardsList>
//             <List sx={{ overflow: "auto", maxHeight: 300, width: "100%" }}>
//               {boards.map(board => (
//                 <Styled.ListItemWrapper key={board.id}>
//                   <ListItem>
//                     <ListItemAvatar>
//                       <Avatar src={board.media.image_cover_url} />
//                     </ListItemAvatar>
//                     <ListItemText primary={board.name} />
//                     <Styled.SaveButtonContainer>
//                       <Button
//                         variant="contained"
//                         sx={{
//                           backgroundColor: "#E60023",
//                           borderRadius: "20px",
//                           "&:hover": {
//                             backgroundColor: "#E60023",
//                           },
//                         }}
//                         onClick={() => handleSelectBoard(board.id)}
//                       >
//                         <PinterestIcon sx={{ color: "#FFFFFF" }} />
//                         Save
//                       </Button>
//                     </Styled.SaveButtonContainer>
//                   </ListItem>
//                 </Styled.ListItemWrapper>
//               ))}
//             </List>
//           </Styled.BoardsList>
//         </Styled.BoardsContainer>
//       </Styled.ModalContent>
//     </DialogModal>
//   );
// };

// export default PinterestModal;

// // Styled Components
// // =======================================================
// let Styled: any;
// Styled = {};

// Styled.ModalContent = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: ModalContent;
//     ${[t.mx(6), t.my(6)]}
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   `;
// });

// Styled.GarmentContainer = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: GarmentContainer;
//     width: 40%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   `;
// });

// Styled.GarmentImage = styled.img(props => {
//   const t = props.theme;
//   return css`
//     label: GarmentImage;
//     width: 200px;
//     height: 200px;
//     object-fit: cover;
//     object-position: top;
//     border-radius: 10px;
//   `;
// });

// Styled.BoardsContainer = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: BoardsContainer;
//     width: 60%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     padding: 20px;
//   `;
// });

// Styled.BoardsTitle = styled.h3(props => {
//   const t = props.theme;
//   return css`
//     label: BoardsTitle;
//     text-align: center;
//     margin-bottom: 10px;
//   `;
// });

// Styled.BoardsList = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: BoardsList;
//     width: 100%;
//     height: 100%;
//     padding: 10px;
//     border-top: 1px solid #ccc;
//   `;
// });

// Styled.ListItemWrapper = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: ListItemWrapper;
//     &:hover {
//       ${Styled.SaveButtonContainer} {
//         visibility: visible;
//       }
//     }
//   `;
// });

// Styled.SaveButtonContainer = styled.div(props => {
//   const t = props.theme;
//   return css`
//     label: SaveButtonContainer;
//     visibility: hidden;
//   `;
// });

import React from "react";
import styled from "@emotion/styled";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItemText,
  ListItem
} from "@mui/material";
import { GarmentData, PinterestBoard } from "src/types";

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
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
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
    background-color: red;
    color: white;
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
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="pinterest-modal-title"
      aria-describedby="pinterest-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" flexDirection="column">
          <Box flex="1" p={2} display="flex">
            <Box flex="1" display="flex" flexDirection="column">
              <StyledImage
                src={garment?.imageUrls?.mainImageUrl}
                alt="Garment"
              />
              <Typography variant="h6" mt={2}>
                {garment?.garmentTitle}
              </Typography>
              <Typography variant="body2">
                {truncateDescription(garment?.description || "")}
              </Typography>
            </Box>
            <Box flex="1" display="flex" flexDirection="column">
              <TextField fullWidth label="Search" variant="outlined" />
              <List style={{ overflow: "auto", maxHeight: 300, marginTop: 8 }}>
                {boards.map(board => (
                  <StyledListItem
                    key={board.id}
                    onMouseEnter={() => onSelectBoard(board.id)}
                  >
                    <ListItemText primary={board.name} />
                    <Button variant="contained" color="primary">
                      Pin it
                    </Button>
                  </StyledListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onCancel}
          >
            Create Board
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PinterestModal;


