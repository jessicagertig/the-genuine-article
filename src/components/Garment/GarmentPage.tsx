import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import SecondaryNav from "src/components/shared/SecondaryNav";
import GarmentContent from "src/components/Garment/GarmentContent";
import { GarmentData } from "src/types";

import { useGarment } from "src/queryHooks/useGarments";

interface GarmentPageProps {}

const GarmentPage: React.FC<GarmentPageProps> = () => {
  const [garmentData, setGarmentData] = React.useState<GarmentData | undefined>(
    undefined
  );
  const { garmentId } = useParams();
  const idToNumber = garmentId ? parseInt(garmentId, 10) : undefined;

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
      <SecondaryNav backPath="/garments" pageTitle={garment ? garment.garmentTitle : ""} />
      <GarmentContent garment={garmentData}/>
    </Styled.GarmentPageContainer>
  );
};

export default GarmentPage;

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
