import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

import { useProgressiveImage } from "src/hooks/useProgressiveImage";

interface ProgressiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string | undefined;
  src: string | undefined;
  isBackground: boolean;
  handleLoading?: (loading: boolean) => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  placeholderSrc,
  src,
  isBackground,
  handleLoading,
  ...props
}) => {
  const { currentSrc, isLoading } = useProgressiveImage(placeholderSrc as string, src as string);

  const isLoadingState: boolean = !!(
    placeholderSrc && isLoading
  );
  console.log("PROGRESSIVE IMAGE", {
    isLoadingState,
    placeholderSrc,
    currentSrc,
    src,
  });

  React.useEffect(() => {

      // console.log("isLoadingState useEffect", isLoadingState);
      handleLoading && handleLoading(isLoadingState);
  }, [isLoadingState, handleLoading, currentSrc]);

  return (
    <>
      {isBackground ? (
        <Styled.Wrapper
          isLoading={isLoadingState}
          isBackground={isBackground}
          {...{ ...props }}
        >
          <Styled.BackgroundImage
            {...{ src: currentSrc, ...props }}
            alt={props.alt || ""}
            isLoading={isLoadingState}
          />
        </Styled.Wrapper>
      ) : (
        <img {...{ src: currentSrc, ...props }} alt={props.alt || ""} />
      )}
    </>
  );
};

export default ProgressiveImage;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

interface Props extends ProgressiveImageProps {
  theme: Theme;
  isLoading: boolean;
  isBackground: boolean;
}

Styled.Wrapper = styled.div((props: Props) => {
  return css`
    height: ${props.height ?? "100%"};
    width: ${props.width ?? "100%"};
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      backdrop-filter: ${props.isLoading ? "blur(5px)" : "blur(0px)"};
      transition: ${props.isLoading ? "none" : "backdrop-filter 0.5s linear"};
    }
  `;
});

Styled.BackgroundImage = styled.img((props: Props) => {
  return css`
    label: ProgressiveImage;
    object-fit: cover;
    object-position: center top;
    display: block;
    height: 100%;
    width: 100%;
    clip-path: ${props.isLoading ? "inset(0)" : "none"};
  `;
});

Styled.Image = styled.img(() => {
  return css`
    label: ProgressiveImage;
    object-fit: cover;
  `;
});
