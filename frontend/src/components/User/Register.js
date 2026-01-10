import { useState } from "react";
import { useLanguage } from '../contexts/language_context_provider';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [activationLink, setActivationLink] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t("user_registered")); // np. "User registered successfully. Check your email."
        setActivationLink(data.activation_link_dev || ""); // wyświetlamy link do aktywacji
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || t("something_wrong"));
        setActivationLink("");
      }
    } catch (err) {
      setMessage(t("network_error"));
      setActivationLink("");
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

      {activationLink && (
        <div className="mt-3 alert alert-success">
          <p>{t("activation_link_ready")}</p>
          <a href={activationLink}>{activationLink}</a>
        </div>
      )}
    </div>
  );
}
