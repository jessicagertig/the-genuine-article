import { render, screen } from "./utils/testUtils";
import { MemoryRouter } from "react-router-dom";
import App from "./layouts/AppWithLayout";

describe("App", () => {
  it("should render the LandingPage component at /", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const landingPageElement = screen.getByText(/Genuine articles of clothing from the 19th century/i);
    expect(landingPageElement).toBeInTheDocument();
  });
});
