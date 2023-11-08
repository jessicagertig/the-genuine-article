import React from "react";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

interface ProgressiveImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
  src: string;
  isBackground: boolean;
}

const ProgressiveImg: React.FC<ProgressiveImgProps> = ({
  placeholderSrc,
  src,
  isBackground,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(placeholderSrc || src);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const isLoadingState = placeholderSrc && imgSrc === placeholderSrc;

  return (
    <Styled.Wrapper
      isLoading={isLoadingState}
      isBackground={isBackground}
      {...{ ...props }}
    >
      {isBackground ? (
        <Styled.BackgroundImage
          {...{ src: imgSrc, ...props }}
          alt={props.alt || ""}
          isLoading={isLoadingState}
        />
      ) : (
        <Styled.Image
          {...{ src: imgSrc, ...props }}
          alt={props.alt || ""}
          isLoading={isLoadingState}
        />
      )}
    </Styled.Wrapper>
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
    background-color: #162c6b;
    clip-path: ${props.isLoading ? "inset(0)" : "none"};
  `;
});

Styled.Image = styled.img((props: Props) => {
  return css`
    label: ProgressiveImage;
    object-fit: cover;
    object-position: center top;
    display: block;
    height: ${props.height ?? "100%"};
    width: ${props.width ?? "100%"};
    background-color: #162c6b;
    clip-path: ${props.isLoading ? "inset(0)" : "none"};
  `;
});