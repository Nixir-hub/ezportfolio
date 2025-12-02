import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../components/contexts/AuthContext";

const mockAuth = {
  user: null,
  login: jest.fn(),
  logout: jest.fn()
};

const renderWithProviders = (ui, route = "/") => {
  return render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

test("renders Home component by default", () => {
  renderWithProviders(<App />, "/");

  expect(screen.getByText(/O mnie/i)).toBeInTheDocument();
});

test("renders Login component when navigating to /login", () => {
  renderWithProviders(<App />, "/login");

  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
});

test("renders Register component when navigating to /register", () => {
  renderWithProviders(<App />, "/register");

  expect(screen.getByText(/register/i)).toBeInTheDocument();
});
