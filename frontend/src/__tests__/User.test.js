import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPanel from "../User";
import { AuthContext } from "../components/AuthContext";
import { apiFetch } from "../api";
import { BrowserRouter } from "react-router-dom";

jest.mock("../api");

// mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// mock window.confirm
global.confirm = jest.fn();

const mockLogout = jest.fn();
const mockUser = { username: "john", email: "john@test.com" };

// UTILITY WRAPPER
function renderWithContext(ui) {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ logout: mockLogout }}>
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

//
// ------------------------------------------
//                TESTY
// ------------------------------------------
//

describe("UserPanel", () => {
  test("shows loading state", () => {
    apiFetch.mockImplementation(() => new Promise(() => {}));

    renderWithContext(<UserPanel />);

    expect(
      screen.getByText("Ładowanie danych użytkownika...")
    ).toBeInTheDocument();
  });

  test("handles profile fetch failure", async () => {
    apiFetch.mockResolvedValueOnce({ ok: false });

    renderWithContext(<UserPanel />);

    expect(
      await screen.findByText("Nie udało się pobrać profilu.")
    ).toBeInTheDocument();
  });

  test("handles network error on profile fetch", async () => {
    apiFetch.mockRejectedValueOnce(new Error("Network error"));

    renderWithContext(<UserPanel />);

    expect(await screen.findByText("Błąd sieci.")).toBeInTheDocument();
  });

  test("loads and displays user data", async () => {
    apiFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    renderWithContext(<UserPanel />);

    expect(await screen.findByText("john")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });

  test("renders all UI sections", async () => {
    apiFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    expect(
      screen.getByRole("heading", { name: "Profil" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Zmiana hasła" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Usuń konto" })
    ).toBeInTheDocument();
  });

  //
  // ----------------------------
  //     ZMIANA HASŁA
  // ----------------------------
  //

  test("changes password successfully", async () => {
    apiFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Hasło zostało zmienione" }),
      });

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.change(screen.getByPlaceholderText("Stare hasło"), {
      target: { value: "oldpass" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nowe hasło"), {
      target: { value: "newpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Zmień hasło" }));

    expect(
      await screen.findByText("Hasło zostało zmienione")
    ).toBeInTheDocument();
  });

  test("shows error on wrong password", async () => {
    apiFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Nieprawidłowe stare hasło" }),
      });

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.change(screen.getByPlaceholderText("Stare hasło"), {
      target: { value: "bad" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nowe hasło"), {
      target: { value: "new" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Zmień hasło" }));

    expect(
      await screen.findByText("Nieprawidłowe stare hasło")
    ).toBeInTheDocument();
  });

  test("shows network error on password change", async () => {
    apiFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
      .mockRejectedValueOnce(new Error("fail"));

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.click(screen.getByRole("button", { name: "Zmień hasło" }));

    expect(await screen.findByText("Błąd sieci.")).toBeInTheDocument();
  });

  //
  // ----------------------------
  //     USUNIĘCIE KONTA
  // ----------------------------
  //

  test("deletes account when confirmed", async () => {
    global.confirm.mockReturnValue(true);

    apiFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Konto usunięte" }),
      });

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.click(screen.getByRole("button", { name: "Usuń" }));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("does not delete account when user cancels", async () => {
    global.confirm.mockReturnValue(false);

    apiFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.click(screen.getByRole("button", { name: "Usuń" }));

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("shows network error on delete failure", async () => {
    global.confirm.mockReturnValue(true);

    apiFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })
      .mockRejectedValueOnce(new Error("fail"));

    renderWithContext(<UserPanel />);

    await screen.findByText("john");

    fireEvent.click(screen.getByRole("button", { name: "Usuń" }));

    expect(await screen.findByText("Błąd sieci.")).toBeInTheDocument();
  });
});
