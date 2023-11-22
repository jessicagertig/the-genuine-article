import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

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
  const [imgSrc, setImgSrc] = React.useState(placeholderSrc || src);

  const isLoadingState: boolean = !!(
    placeholderSrc && imgSrc === placeholderSrc
  );

  // console.log("PROGRESSIVE IMAGE", {
  //   isLoadingState,
  //   placeholderSrc,
  //   imgSrc,
  //   src,
  // });

  React.useEffect(() => {
    if (isLoadingState) {
      // console.log("isLoadingState useEffect", isLoadingState);
      handleLoading !== undefined && handleLoading(isLoadingState);
    }
  }, [isLoadingState, handleLoading]);
  React.useEffect(() => {
    console.log("src changed", src);
    // rest of the code...
  }, [src]);

  React.useEffect(() => {
    console.log("imgSrc changed", imgSrc);
    // rest of the code...
  }, [imgSrc]);

  React.useEffect(() => {
    console.log("handleLoading changed", handleLoading);
  }, [handleLoading]);

  React.useEffect(() => {
    const img = new Image();
    if (src) {
      console.log("Did this run more than once?");
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        console.log("It's loaded!");
        if (handleLoading) {
          handleLoading(false);
        }
      };
    }
  }, [src, handleLoading]);

  return (
    <>
      {isBackground ? (
        <Styled.Wrapper
          isLoading={isLoadingState}
          isBackground={isBackground}
          {...{ ...props }}
        >
          <Styled.BackgroundImage
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            isLoading={isLoadingState}
          />
        </Styled.Wrapper>
      ) : (
        <img {...{ src: imgSrc, ...props }} alt={props.alt || ""} />
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
      transition: ${props.isLoading ? "none" : "backdrop-filter 0.3s linear"};
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
