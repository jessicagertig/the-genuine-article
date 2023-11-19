import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

interface ProgressiveImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
  src: string;
  isBackground: boolean;
  handleLoading?: (loading?: boolean) => void;
}

const ProgressiveImg: React.FC<ProgressiveImgProps> = ({
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
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      if (handleLoading) {
        handleLoading(false);
      }
    };
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
        <Styled.Image
          {...{ src: imgSrc, ...props }}
          alt={props.alt || ""}
          isLoading={isLoadingState}
        />
      )}
    </>
  );
};

export default ProgressiveImg;

// Styled Components
// =======================================================
let Styled: any;
Styled = {};

interface Props extends ProgressiveImgProps {
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
      backdrop-filter: ${props.isLoading ? "blur(7px)" : "blur(0px)"};
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

Styled.Image = styled.img((props: Props) => {
  return css`
    label: ProgressiveImage;
    object-fit: cover;
    height: ${props.height ?? "100%"};
    width: ${props.width ?? "100%"};
  `;
});
