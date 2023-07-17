import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams, useLocation } from "react-router-dom";

import SecondaryNav from "src/components/shared/SecondaryNav";
import GarmentContent from "src/components/AdminPage/AdminGarmentContent";
import { GarmentData } from "src/types";

import { useGarment } from "src/queryHooks/useGarments";

interface AdminGarmentPageProps {}

const AdminGarmentPage: React.FC<AdminGarmentPageProps> = () => {
  const { garmentId } = useParams();
  const location = useLocation();
  const [garmentData, setGarmentData] = React.useState<GarmentData | undefined>(
    undefined
  );

  console.log("GARMENT ID", garmentId);
  const idToNumber = garmentId ? parseInt(garmentId, 10) : undefined;
  const pageNo = location?.state?.pageNo;
  const rowsNo = location?.state?.rowsNo;

  const {
    data: garment,
    isLoading: garmentIsLoading,
  }: { data: GarmentData; isLoading: boolean } = useGarment({
    itemId: idToNumber,
  });

  React.useEffect(() => {
    if (garment) {
      setGarmentData(garment);
    }
  }, [garment]);

  return (
    <Styled.GarmentPageContainer>
      <SecondaryNav
        backPath="/admin"
        pageTitle={garment ? garment.garmentTitle : ""}
        pageNumber={pageNo}
        rowsNumber={rowsNo}
      />
      <GarmentContent garment={garmentData} admin={true} />
    </Styled.GarmentPageContainer>
  );
};

export default AdminGarmentPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentPageContainer = styled.div(() => {
  return css`
    label: GarmentPageContainer;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});
