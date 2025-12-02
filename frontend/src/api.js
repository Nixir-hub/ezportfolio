export async function apiFetch(url, options = {}) {
  const access = localStorage.getItem("access");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  return res;
}

