import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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
  { id: "collectionUrl", label: "Source Url" },
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
  const location = useLocation();

  React.useEffect(() => {
    console.log("LOCATION", location);
    if (location?.state?.rowsNo !== undefined) {
      setRowsPerPage(location.state.rowsNo);
    }
    if (location?.state?.pageNo !== undefined) {
      setPage(location.state.pageNo);
    }
  }, []);

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.ceil(count / rowsPerPage) - 1);
    };

    const colorStyle = {
      color: "#172a4f",
      "&:hover": {
        backgroundColor: "rgba(211, 217, 229, 0.5)",
      },
      "&.Mui-disabled": { color: "rgba(23, 42, 79, 0.6)" },
    };

    return (
      <Box
        sx={{
          flexShrink: 0,
          ml: 2.5,
        }}
      >
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
          sx={colorStyle}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
          sx={colorStyle}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
          sx={colorStyle}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
          sx={colorStyle}
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newAmount = Number(event?.target?.value);
    setRowsPerPage(newAmount);
    setPage(0);
  };

  const handleRowClick = (
    event: React.SyntheticEvent,
    garmentId: number
  ): void => {
    event.preventDefault();
    navigate(`/admin/garment/${garmentId}`, {
      state: {
        pageNo: page,
        rowsNo: rowsPerPage,
      },
    });
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

  const handleLinkClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
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
    hasImage: string | React.ReactNode;
    addImageButton: React.ReactNode;
    [key: string]: number | string | React.ReactNode;
  }

  const formatData = (garment: GarmentData): FormattedData => {
    const colorsList = convertArray(garment.colors);
    const materialsList = convertArray(garment.materials);
    const hasImage = garment.imageUrls;
    const buttonStyles = { padding: "0px", textTransform: "none" };
    const imagePreview = () => {
      if (hasImage) {
        return <Styled.Image src={garment.imageUrls?.thumbUrl} />;
      } else {
        return <Styled.Text>none</Styled.Text>;
      }
    };

    const sourceLink = (
      <a href={garment.collectionUrl} target="_blank" rel="noreferrer">
        <TextButton
          type="button"
          rel="noreferrer"
          href={garment.collectionUrl}
          onClick={e => handleLinkClick(e)}
          hasEndIcon={true}
          iconType="externalLink"
          styles={{
            padding: "0px",
            textTransform: "none",
            width: "60%",
            minWidth: "36px",
          }}
        >
          View
        </TextButton>
      </a>
    );

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
      hasImage: imagePreview(),
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? (1 + page) * rowsPerPage - rows.length : 0;

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
        boxShadow: "0px 2px 1px -1px rgba(23, 42, 79, 0.12), 0px 1px 1px 0px rgba(23, 42, 79, 0.3), 0px 1px 3px 0.5px rgba(23, 42, 79, 0.2)",
      }}
    >
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="garments table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid rgb(211, 217, 229)",
                    fontSize: "1rem",
                    color: "#172a4f",
                    pt: 3,
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
                    onClick={event => handleRowClick(event, row.id)}
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "rgba(211, 217, 229, 0.5)",
                      },
                    }}
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
                            color: "#223F7C",
                            fontWeight: "bold",
                            fontSize: "14px",
                            height: "72px",
                            py: 1.5,
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 72 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        ActionsComponent={TablePaginationActions}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={event => handleChangeRowsPerPage(event)}
        sx={{
          color: "#172a4f",
          "& .MuiSelect-icon": {
            color: "#172a4f",
          },
          "& .MuiInputBase-input": {
            color: "#172a4f",
          },
          "& .MuiTablePagination-displayedRows": {
            width: "84px",
          }
        }}
      />
    </Paper>
  );
};
// MuiSvgIcon-root-MuiSelect-icon
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

Styled.Image = styled.img`
  label: ThumbImage;
  height: 48px;
  width: auto;
`;

Styled.Text = styled.p`
  label: CellText;
  width: 48px;
  text-align: center;
`;
