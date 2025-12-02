import { useState, useEffect, useContext } from "react";
import { apiFetch } from "./api";
import { AuthContext } from "./components/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Profil
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  // Zmiana hasła
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Usunięcie konta
  const [deleteMessage, setDeleteMessage] = useState("");

  // Pobranie danych użytkownika
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch("http://localhost:8000/user/");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setProfileError("Nie udało się pobrać profilu.");
        }
      } catch (err) {
        setProfileError("Błąd sieci.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Zmiana hasła
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("http://localhost:8000/change-password/", {
        method: "POST",
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });
      const data = await res.json();
      setPasswordMessage(data.message || data.error);
      setOldPassword("");
      setNewPassword("");
    } catch {
      setPasswordMessage("Błąd sieci.");
    }
  };

  // Usunięcie konta
  const handleDelete = async () => {
    if (!window.confirm("Czy na pewno chcesz usunąć konto?")) return;

    try {
      const res = await apiFetch("http://localhost:8000/delete-account/", { method: "DELETE" });
      const data = await res.json();
      setDeleteMessage(data.message);
      logout();
      navigate("/");
    } catch {
      setDeleteMessage("Błąd sieci.");
    }
  };

  if (loading) return <p className="text-center mt-5">Ładowanie danych użytkownika...</p>;
  if (profileError) return <p className="text-center mt-5 text-danger">{profileError}</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Panel użytkownika</h2>

      {/* Profil */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Profil</h5>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      {/* Zmiana hasła */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Zmiana hasła</h5>
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Stare hasło"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">Zmień hasło</button>
          </form>
          {passwordMessage && <div className="mt-3 alert alert-info">{passwordMessage}</div>}
        </div>
      </div>

      {/* Usunięcie konta */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Usuń konto</h5>
          <button className="btn btn-danger w-100" onClick={handleDelete}>
            Usuń
          </button>
          {deleteMessage && <div className="mt-3 alert alert-info">{deleteMessage}</div>}
        </div>
      </div>
    </div>
  );
}
