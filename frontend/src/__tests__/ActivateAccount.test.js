import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ActivateAccount from "../components/User/ActivateAccount";

global.fetch = jest.fn();

test("activation success", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  render(
    <MemoryRouter initialEntries={["/activate/abc/123/"]}>
      <Routes>
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Aktywuję konto...")).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText("Konto aktywowane! Możesz się zalogować.")).toBeInTheDocument()
  );
});

test("activation error", async () => {
  fetch.mockResolvedValueOnce({ ok: false });

  render(
    <MemoryRouter initialEntries={["/activate/abc/invalid/"]}>
      <Routes>
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText("Nieprawidłowy link aktywacyjny.")).toBeInTheDocument()
  );
});
