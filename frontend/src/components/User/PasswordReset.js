import { useState, useEffect } from "react";
import {useLanguage} from '../contexts/language_context_provider';


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const { t } = useLanguage()
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

      setMessage("Reset link send to console(dev) email. Check it out.");
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
          placeholder={t('email')}
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
