import { useState, useEffect } from "react";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/login/", {
      credentials: "include",
    });
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    const csrftoken = getCookie("csrftoken");

    try {
      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      console.log("Dev reset link:", text);

      setMessage("Link resetu został wysłany (sprawdź konsolę dev).");
    } catch (err) {
      setMessage("Błąd sieci");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h3>Reset hasła</h3>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Twój email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary w-100">
          Wyślij link resetu
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
