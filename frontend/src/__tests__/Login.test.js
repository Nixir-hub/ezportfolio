import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/User/Login";
import { AuthContext } from "../components/contexts/AuthContext";

test("renders form fields", () => {
  render(
    <MemoryRouter   future={{v7_startTransition: true,}}>
      <AuthContext.Provider value={{ login: jest.fn(), user: null }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Hasło")).toBeInTheDocument();
});

