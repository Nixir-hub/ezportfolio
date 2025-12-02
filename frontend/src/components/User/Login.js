import { useState, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../AuthContext";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);               // <-- zapisuje tokeny + usera do stanu
        navigate("/user");         // <-- przekierowanie
      } else {
        setMessage(data.detail || "Błędne dane logowania");
      }
    } catch (err) {
      setMessage("Błąd sieci");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Zaloguj
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/password-reset">Nie pamiętasz hasła?</Link>
      </div>
      {message && <div className="mt-3 alert alert-info">{message}</div>}


    </div>
  );
}
