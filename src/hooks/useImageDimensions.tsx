import React from "react";
import { useWindowSizeContext } from 'src/context/WindowSizeContext';

interface ImageDimensionsParams {
  imageLoaded: boolean;
  dimensions: {
    width: number;
    height: number;
  };
}

const useImageDimensions = ({imageLoaded, dimensions}: ImageDimensionsParams) => {
  const { dimensions: { height: windowHeight, width: windowWidth }} = useWindowSizeContext();
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);

  const widthMultiplier = imageLoaded
    ? (dimensions.width / dimensions.height)
    : 0.82;
  const heightMultiplier = imageLoaded
    ? (dimensions.height / dimensions.width)
    : 1.22;

  React.useEffect(() => {
    if (imageLoaded) {
      const calcWidth = windowHeight * widthMultiplier;
      const calcHeight = windowWidth * heightMultiplier;
      if (windowWidth >= calcWidth) {
        setMaxWidth(calcWidth);
        setMaxHeight(windowHeight);
      } else {
        setMaxWidth(windowWidth);
        setMaxHeight(calcHeight);
      }
    }
  }, [
    dimensions,
    windowHeight,
    windowWidth,
    widthMultiplier,
    heightMultiplier,
    imageLoaded,
  ]);

  return { maxHeight, maxWidth };
}

export default useImageDimensions;
