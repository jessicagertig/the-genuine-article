import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams, useLocation } from "react-router-dom";

import NavBar from "src/components/shared/NavBar";
import SecondaryNav from "src/components/shared/SecondaryNav";
import GarmentContent from "src/components/Garment/GarmentContent";
import Footer from "src/components/shared/Footer";
import { GarmentData } from "src/types";

import { useGarment } from "src/queryHooks/useGarments";

interface GarmentPageProps {}

const GarmentPage: React.FC<GarmentPageProps> = () => {
  const [garmentData, setGarmentData] = React.useState<GarmentData | undefined>(
    undefined
  );
  const { garmentId } = useParams();
  const location = useLocation();

  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const idToNumber = garmentId ? parseInt(garmentId, 10) : undefined;
  const pageNo = location?.state?.pageNo;

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
    <Styled.GarmentPageContainer ref={pageContainerRef}>
      <NavBar backgroundColor="white" shadow={true} />
      <SecondaryNav
        backPath="/garments"
        pageTitle={garment ? garment.garmentTitle : ""}
        pageNumber={pageNo}
      />
      <GarmentContent garment={garmentData} loading={garmentIsLoading} />
      <Footer scrollToTop={scrollToTop} />
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    & > :last-child {
      margin-top: auto;
    }
  `;
});
