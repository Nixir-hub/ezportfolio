import { useState } from "react";
import {useLanguage} from '../../language_context_provider';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLanguage()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Zarejestrowano użytkownika. Sprawdź e-mail w celu aktywacji.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Coś poszło nie tak.");
      }
    } catch (err) {
      setMessage("Błąd sieci.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">{t("register")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">{t("register")}</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}
