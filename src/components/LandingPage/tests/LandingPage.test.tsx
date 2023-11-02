import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import LandingPage from "src/components/LandingPage";
import { WindowSizeProvider } from "src/context/WindowSizeContext";
import * as WindowSizeContext from "src/context/WindowSizeContext";

// Create a mock provider
const MockWindowSizeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <WindowSizeProvider>{children}</WindowSizeProvider>;

const mockUseWindowSizeContext = jest.fn(() => ({
  dimensions: { height: 800, width: 600 },
}));

jest.doMock("src/context/WindowSizeContext", () => ({
  useWindowSizeContext: mockUseWindowSizeContext,
}));

function mockMain() {
  return React.forwardRef<HTMLDivElement, {}>((props, ref) => <div ref={ref}>Main</div>);
}

// Mock the components
jest.mock("src/components/shared/NavBar", () => () => <div>NavBar</div>);
jest.mock("src/components/LandingPage/Main", () => () => <div>Main</div>);
jest.mock("src/components/LandingPage/Main", () => mockMain());
jest.mock("src/components/LandingPage/DailyGarment", () => () => (
  <div>DailyGarment</div>
));
jest.mock("src/components/LandingPage/BottomContent", () => () => (
  <div>BottomContent</div>
));
jest.mock("src/components/shared/Footer", () => () => <div>Footer</div>);

describe("LandingPage", () => {
  it("renders without crashing", () => {
    render(
      <MockWindowSizeProvider>
        <LandingPage />
      </MockWindowSizeProvider>
    );
    expect(screen.getByTestId("landing-page-container")).toBeInTheDocument();
  });

  it("calls useWindowSizeContext", () => {
    const spy = jest.spyOn(WindowSizeContext, "useWindowSizeContext");
    render(
      <MockWindowSizeProvider>
        <LandingPage />
      </MockWindowSizeProvider>
    );
    expect(spy).toHaveBeenCalled();
  });
});
