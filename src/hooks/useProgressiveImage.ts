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

const imageReducer = (
  state: string,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "MAIN_IMAGE_LOADED":
      return action.payload;
    case "FALLBACK_IMAGE_LOADED":
      return state ? state : action.payload;
    default:
      return state;
  }
};

export const useProgressiveImage = (
  placeholderSrc: string,
  fullSrc: string
) => {
  const [currentSrc, dispatch] = React.useReducer(imageReducer, "");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

      const loadPlaceholder = () => {
          dispatch({ type: "FALLBACK_IMAGE_LOADED", payload: placeholderSrc });
      };

      const loadFull = async () => {
        try {
          const fullUri = await getDataUri(fullSrc, signal);
          dispatch({ type: "MAIN_IMAGE_LOADED", payload: fullUri });
          setIsLoading(false);
        } catch (error: any) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        }
      };

      loadFull();
      loadPlaceholder();

    return () => {
      controller.abort();
    };
  }, [fullSrc, placeholderSrc]);

  return { currentSrc, isLoading };
};