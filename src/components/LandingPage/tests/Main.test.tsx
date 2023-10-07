import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "src/utils/themeTestHelper";
import Main from "src/components/LandingPage/Main";

describe("Main component", () => {
  it("renders 'A Digital Collection' text", () => {
    // Create a mock ref object
    const scrollRef = React.createRef<HTMLDivElement>();
    // Render the Main component
    render(
        <Main ref={scrollRef} windowHeight={500} />
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
        <Main ref={scrollRef as unknown as React.RefObject<HTMLDivElement>} windowHeight={windowHeight} />
    );

    const button = screen.getByTestId("scroll-down-teaser-button");
    fireEvent.click(button);

    expect(scrollRef.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });
});

