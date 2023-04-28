import { render, screen } from './utils/testUtils';
import { MemoryRouter } from 'react-router-dom';
import App from './layouts/AppWithLayout';

describe("App", () => {
  it("should render the LandingPage component by default", () => {
    render(
      <MemoryRouter>
          <App />
      </MemoryRouter>
    );
    const landingPageElement = screen.getByText(/The Genuine Article/i);
    expect(landingPageElement).toBeInTheDocument();
  });
});
