import { AuthContext } from "./components/contexts/AuthContext";

export async function apiFetch(url, options = {}) {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  let headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (access) headers["Authorization"] = `Bearer ${access}`;

  // --- pierwsza próba ---
  let res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // jeśli access wygasł → próbujemy refresh
  if (res.status === 401 && refresh) {
    const refreshRes = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
      credentials: "include",
    });

    if (!refreshRes.ok) {
      AuthContext.logout(); // refresh wygasł → wyloguj użytkownika
      return res;
    }

    const data = await refreshRes.json();

    // zapisz nowy access token
    localStorage.setItem("access", data.access);

    // tworzę całkowicie nowy headers (ważne!)
    const retryHeaders = {
      ...headers,
      Authorization: `Bearer ${data.access}`
    };

    // --- retry request ---
    return fetch(url, {
      ...options,
      headers: retryHeaders,
      credentials: "include",
    });
  }

  return res;
}
