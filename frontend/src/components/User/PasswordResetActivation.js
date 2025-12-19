import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== password2) {
      setMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`/api/password-reset-confirm/${uid}/${token}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Something went wrong.");
      } else {
        setMsg(data.message || "Password changed successfully.");
      }
    } catch (err) {
      setMsg("Network error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2>Set a new password</h2>

      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="New password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Repeat password"
          className="form-control mb-3"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Saving..." : "Change Password"}
        </button>
      </form>

      {msg && (
        <p className="mt-3">
          {msg}
        </p>
      )}
    </div>
  );
}
