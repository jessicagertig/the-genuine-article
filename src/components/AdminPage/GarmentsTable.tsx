import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
  { id: "beginYear", label: "Begin Year" },
  { id: "cultureCountry", label: "Culture/Country" },
  { id: "collection", label: "Collection/Museum" },
  { id: "collectionUrl", label: "Source Url" },
  { id: "addImageButton", label: "" },
];

interface GarmentsTableProps {}

const GarmentsTable = (props: GarmentsTableProps) => {
  const { data: garments, isLoading, error } = useGarments();

  const { openModal, removeModal } = useModalContext();

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [rows, setRows] = React.useState<any[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOnClick = (garmentId: number): void => {
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
    hasImage: boolean;
    addImageButton: React.ReactNode;
  }

  const formatData = (garment: GarmentData): FormattedData => {
    const colorsList = convertArray(garment.colors);
    const materialsList = convertArray(garment.materials);
    const hasImage = garment.imageUrls ? true : false;
    const sourceLink = (
      <a href={garment.collectionUrl} target="_blank">
        View link
      </a>
    );

    const buttonStyles = { padding: "0px", textTransform: "none" };
    const addImageButton = (
      <TextButton
        type="button"
        onClick={() => handleOnClick(garment.id)}
        hasEndIcon={true}
        iconType="image"
        styles={buttonStyles}
      >
        Add image
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

  React.useEffect(() => {
    if (garments) {
      const tableRows: FormattedData[] = garments?.map((garment: GarmentData) =>
        formatData(garment)
      );
      setRows(tableRows);
    }
  }, [garments]);

  if (isLoading || !garments) {
    return (
      <Styled.LoadingContainer>
        <h2>Loading...</h2>
        <LoadingBar />
      </Styled.LoadingContainer>
    )
  }

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginLeft: "20px",
        marginRight: "20px", 
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
                  style={{ fontWeight: "bold" }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
