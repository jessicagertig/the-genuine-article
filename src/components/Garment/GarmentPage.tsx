import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import NavBar from "src/components/shared/NavBar";
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

  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (pageContainerRef && pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
    <Styled.GarmentPageContainer ref={pageContainerRef}>
      <NavBar backgroundColor="white" shadow={true} />
      <GarmentContent
        garment={garmentData}
        loading={garmentIsLoading}
        isDark={largeScreen}
      />
      <Footer scrollToTop={scrollToTop} dark={!largeScreen} />
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
