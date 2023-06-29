import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import SecondaryNav from "src/components/shared/SecondaryNav";
import GarmentContent from "src/components/shared/GarmentContent";
import { GarmentData } from "src/types";

import { useGarment } from "src/queryHooks/useGarments";

interface GarmentPageProps {}

const GarmentPage: React.FC<GarmentPageProps> = () => {
  const [garmentData, setGarmentData] = React.useState<GarmentData | undefined>(
    undefined
  );
  const { garmentId } = useParams();

  console.log("GARMENT ID", garmentId);
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
      <SecondaryNav backPath="/search" pageTitle="" />
      <GarmentContent garment={garmentData} />
    </Styled.GarmentPageContainer>
  );
};

export default GarmentPage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

Styled.GarmentPageContainer = styled.div(props => {
  const t = props.theme;
  return css`
    label: GarmentPageContainer;
    ${t.pt(6)}
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
});
