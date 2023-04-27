import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './layouts/AppWithLayout';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

describe("App", () => {
  it("should render the LandingPage component by default", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}> 
          <App />
        </ThemeProvider>
      </MemoryRouter>
    );
    const landingPageElement = screen.getByText(/The Genuine Article/i);
    expect(landingPageElement).toBeInTheDocument();
  });
});
