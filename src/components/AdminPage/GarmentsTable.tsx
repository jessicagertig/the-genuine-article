import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import PaginationActions from "src/components/AdminPage/PaginationActions";
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

interface GarmentsTableProps {}

const GarmentsTable: React.FC<GarmentsTableProps> = props => {
  const { data: garments, isLoading } = useGarments();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { openModal, removeModal } = useModalContext();

  const initialRows = isSmallScreen ? 5 : 8;
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(initialRows);

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
    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const smallScreenColumns: Column[] = [
    { id: "id", label: "Id" },
    { id: "beginYear", label: "Year" },
    { id: "collectionUrl", label: "Source Url" },
    { id: "hasImage", label: "Image" },
  ];

  const largerScreenColumns: Column[] = [
    { id: "id", label: "Id" },
    { id: "garmentTitle", label: "Garment Title" },
    { id: "beginYear", label: "Year" },
    { id: "colors", label: "Colors" },
    { id: "collectionUrl", label: "Source Url" },
    { id: "hasImage", label: "Image" },
    { id: "addImageButton", label: "" },
  ];

  const columns = isSmallScreen ? smallScreenColumns : largerScreenColumns;

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
    navigate(`/admin/garments/${garmentId}`, {
      state: {
        pageNo: page,
        rowsNo: rowsPerPage,
      },
    });
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

  const formatData = React.useCallback((garment: GarmentData): FormattedData => {
    
    // helper functions
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

    // begin main function
    
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
  }, [openModal, removeModal]);

  const rows = React.useMemo(() => {
    if (garments) {
      const tableRows: FormattedData[] = garments?.map((garment: GarmentData) =>
        formatData(garment)
      );
      return tableRows;
    }
    return [];
  }, [garments, formatData]);

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
        marginBottom: "150px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow:
          "0px 2px 1px -1px rgba(23, 42, 79, 0.12), 0px 1px 1px 0px rgba(23, 42, 79, 0.3), 0px 1px 3px 0.5px rgba(23, 42, 79, 0.2)",
      }}
    >
      <TableContainer sx={{ maxHeight: 702 }}>
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
                    color: "#020b1c",
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
        rowsPerPageOptions={[5, 8, 10, 15]}
        ActionsComponent={PaginationActions}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={event => handleChangeRowsPerPage(event)}
        sx={{
          color: "#020b1c",
          "& .MuiSelect-icon": {
            color: "#020b1c",
          },
          "& .MuiInputBase-input": {
            color: "#020b1c",
          },
          "& .MuiTablePagination-displayedRows": {
            width: "84px",
          },
          " .MuiTablePagination-selectLabel": {
            display: isSmallScreen ? "none" : "unset",
          },
          "& .MuiTablePagination-toolbar": {
            pl: isSmallScreen ? "4px" : 2,
          },
        }}
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
    width: 50%;
    height: calc(100vh - 124px);
    padding-bottom: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    h2 {
      font-family: "bellota text";
      font-size: 1.25rem;
      color: #020b1c;
      ${t.m(4)}
    }

    ${t.mq.md} {
      height: calc(100vh - 166px);
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
