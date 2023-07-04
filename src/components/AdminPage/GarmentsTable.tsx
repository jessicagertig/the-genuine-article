import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import TextButton from "src/components/shared/TextButton";
import LoadingBar from "src/components/shared/Loading";
import { useGarments } from "src/queryHooks/useGarments";
import { useModalContext } from "src/context/ModalContext";
import { GarmentData } from "src/types";

import ImageUploadModal from "./ImageUploadModal";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Id" },
  { id: "garmentTitle", label: "Garment Title" },
  { id: "beginYear", label: "Year" },
  { id: "colors", label: "Colors" },
  { id: "collectionUrl", label: "Url" },
  { id: "hasImage", label: "Image" },
  { id: "addImageButton", label: "" },
];

interface GarmentsTableProps {}

const GarmentsTable: React.FC<GarmentsTableProps> = props => {
  const { data: garments, isLoading, error } = useGarments();

  const { openModal, removeModal } = useModalContext();

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (
    event: React.SyntheticEvent,
    garmentId: number
  ): void => {
    event.preventDefault();
    navigate(`/admin/garment/${garmentId}`);
  };

  const handleButtonClick = (
    event: React.SyntheticEvent,
    garmentId: number
  ): void => {
    event.stopPropagation();
    const modal = (
      <ImageUploadModal onCancel={() => removeModal()} id={garmentId} />
    );

    openModal(modal);
  };

  const convertArray = (array: string[]): string => {
    let stringList = "";
    if (array.length > 0) {
      stringList = array.join(", ");
    }
    return stringList;
  };

  interface FormattedData {
    id: number;
    garmentTitle: string;
    beginYear: string;
    cultureCountry: string | null;
    collection: string;
    collectionUrl: React.ReactNode;
    colors: string;
    materials: string;
    hasImage: string;
    addImageButton: React.ReactNode;
    [key: string]: number | string | React.ReactNode;
  }

  const formatData = (garment: GarmentData): FormattedData => {
    const colorsList = convertArray(garment.colors);
    const materialsList = convertArray(garment.materials);
    const hasImage = garment.imageUrls ? "yes" : "none";
    const sourceLink = (
      <a href={garment.collectionUrl} target="_blank" rel="noreferrer">
        View
      </a>
    );

    const buttonStyles = { padding: "0px", textTransform: "none" };
    const addImageButton = (
      <TextButton
        type="button"
        onClick={event => handleButtonClick(event, garment.id)}
        hasEndIcon={true}
        iconType="image"
        styles={buttonStyles}
      >
        Add
      </TextButton>
    );

    return {
      id: garment.id,
      garmentTitle: garment.garmentTitle,
      beginYear: garment.beginYear,
      cultureCountry: garment.cultureCountry,
      collection: garment.collection,
      collectionUrl: sourceLink,
      colors: colorsList,
      materials: materialsList,
      hasImage: hasImage,
      addImageButton: addImageButton,
    };
  };

  const rows = React.useMemo(() => {
    if (garments) {
      const tableRows: FormattedData[] = garments?.map((garment: GarmentData) =>
        formatData(garment)
      );
      return tableRows;
    }
    return [];
  }, [garments]);

  if (isLoading || !garments) {
    return (
      <Styled.LoadingContainer>
        <h2>Loading...</h2>
        <LoadingBar />
      </Styled.LoadingContainer>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="garments table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid rgb(180 180 180)",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    onClick={event => handleRowClick(event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GarmentsTable;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.LoadingContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: LoadingContainer;
    ${t.mb(10)}
    width: 50%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #172a4f;
      ${t.m(4)}
    }
  `;
});
