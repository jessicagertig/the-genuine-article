import React from "react";
import { render, screen, fireEvent } from "src/utils/themeTestHelper";
import Main from "src/components/LandingPage/Main";

describe("Main component", () => {
  it("renders background image and text", () => {
    render(
      <Main windowHeight={100} />
    );
  
    // Test for background image
    const backgroundImage = screen.getByRole("img");
    expect(backgroundImage).toHaveAttribute(
      "alt",
      expect.stringContaining("background of floral brocaded")
    );
  
    // Test for header text
    const headerText = screen.getByText("A Digital Collection");
    expect(headerText).toBeInTheDocument();
  
    // Test for text content
    const textContent = screen.getByText(
      "Genuine articles of clothing from the 19th century"
    );
    expect(textContent).toBeInTheDocument();
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

