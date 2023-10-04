import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "src/components/LandingPage/Main";
import { ThemeProvider } from "@emotion/react";
import myTheme from "src/styles/theme";

describe("Main component", () => {
  it("renders 'A Digital Collection' text", () => {
    // Create a mock ref object
    const scrollRef = React.createRef<HTMLDivElement>();
    // Render the Main component
    render(
      <ThemeProvider theme={myTheme}>
        <Main scrollRef={scrollRef} windowHeight={500} />
      </ThemeProvider>
    );

    // Assert that the 'A Digital Collection' text exists
    const textElement = screen.getByText("A Digital Collection");
    expect(textElement).toBeInTheDocument();
  });

  it("calls function with behavior smooth when scroll-down-teaser-button is clicked", () => {
    const scrollIntoViewMock = jest.fn();
    const scrollRef = {
      current: {
        scrollIntoView: scrollIntoViewMock,
      },
    };
    const windowHeight = 800; // Replace with the desired window height


    render(
      <ThemeProvider theme={myTheme}>
        <Main scrollRef={scrollRef as unknown as React.RefObject<HTMLDivElement>} windowHeight={windowHeight} />
      </ThemeProvider>
    );

    const button = screen.getByTestId("scroll-down-teaser-button");
    fireEvent.click(button);

    expect(scrollRef.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });
});

