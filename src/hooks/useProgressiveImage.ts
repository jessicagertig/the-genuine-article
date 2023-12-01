import React from "react";

// const getDataUri = (url: string): Promise<string> => {
//   const image = new Image();
//   return new Promise((accept) => {
//     image.crossOrigin = "anonymous"
//     image.onload = function () {
//       const canvas = document.createElement("canvas");
//       canvas.width = image.naturalWidth;
//       canvas.height = image.naturalHeight;
  
//       canvas.getContext("2d")?.drawImage(image, 0, 0);
    
//       // get as Data URI
//       const dataUri = canvas.toDataURL("image/png");

//       accept(dataUri)
//     };
//     image.src = url;
//   })
// }

// export const useProgressiveImage = (placeholderSrc: string, fullSrc: string) => {
//   const [src, setSrc] = React.useState(placeholderSrc);
//   console.log("HOOK", { src })
//   React.useEffect(() => {
//     const loadImage = async () => {
//       const uriSrc = await getDataUri(fullSrc);
//       setSrc(uriSrc);
//     };
//     loadImage();
//   }, [fullSrc]);

//   return src;
// }

const getDataUri = async (
  url: string,
  signal: AbortSignal
): Promise<string> => {
  const response = await fetch(url, { signal });
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const useProgressiveImage = (
  placeholderSrc: string,
  fullSrc: string
) => {
  const [src, setSrc] = React.useState(placeholderSrc);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const load = async () => {
      try {
        const dataUri = await getDataUri(fullSrc, signal);
        setSrc(dataUri);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [fullSrc]);

  return src;
};