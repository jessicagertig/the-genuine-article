import { render, screen } from "./utils/testUtils";
import { MemoryRouter } from "react-router-dom";
import App from "./layouts/AppWithLayout";

describe("App Routing Test", () => {
  it("should render the LandingPage component at /about", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );
    const landingPageElement = screen.getByText(
      /Genuine articles of clothing from the 19th century/i
    );
    expect(landingPageElement).toBeInTheDocument();
  });

  it("should render the PublicFooter at /about", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const footerSummary = screen.getByText(/historical details and a link/i);
    expect(footerSummary).toBeInTheDocument();
  });

  it("should render the search component at /garments", () => {
    render(
      <MemoryRouter initialEntries={["/garments"]}>
        <App />
      </MemoryRouter>
    );
    const searchElement = screen.getByText(/search garments/i);
    expect(searchElement).toBeInTheDocument();
  });
});
