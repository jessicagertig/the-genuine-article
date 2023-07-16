import React from "react";

interface WindowSizeContextType {
  dimensions: {
    height: number;
    width: number;
  }
}

const WindowSizeContext = React.createContext<WindowSizeContextType | undefined>(
  undefined
);

interface WindowSizeProviderProps {
  children: React.ReactNode;
}

const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({ children }) => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  React.useEffect(() => {
    const handleResize = () => {
      const newDimensions= {
        height: window.innerHeight,
        width: window.innerWidth
      }
      setDimensions(newDimensions)
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }) // no dependency array so effect will run on every rerender (alternatively should I use window.innerWidth and window.innerHeight as dependencies?)

  return (
    <WindowSizeContext.Provider
      value={{ dimensions }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
};

const useWindowSizeContext = () => {
  const context = React.useContext(WindowSizeContext);
  if (context === undefined) {
    throw new Error("useWindowSizeContext must be used within a WindowSizeProvider");
  }

  const { dimensions } = context;

  return {
    dimensions
  };
};

export { useWindowSizeContext, WindowSizeProvider };
