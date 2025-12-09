import { useState } from "react";
import { useLanguage } from "../contexts/language_context_provider";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLanguage();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/password-reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage("Network error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h3>{t("changePassword")}</h3>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary w-100">
          {t("submit")}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
