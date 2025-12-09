import { useState, useEffect, useContext } from "react";
import { apiFetch } from "../../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {useLanguage} from '../contexts/language_context_provider';

export default function UserPanel() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useLanguage()

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
        const res = await apiFetch(`/api/user/`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setProfileError("It's not possible to fetch user profile. Try to logout and login again.");
        }
      } catch (err) {
        setProfileError("Network error. Try again later.");
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
      const res = await apiFetch(`/api/change-password/`, {
        method: "POST",
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });
      const data = await res.json();
      setPasswordMessage(data.message || data.error);
      setOldPassword("");
      setNewPassword("");
    } catch {
      setPasswordMessage("Network error. Try again later.");
    }
  };

  // Usunięcie konta
  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete account?")) return;

    try {
      const res = await apiFetch(`/api/delete-account/`, { method: "DELETE" });
      const data = await res.json();
      setDeleteMessage(data.message);
      logout();
      navigate("/");
    } catch {
      setDeleteMessage("Network error. Try again later.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (profileError) return <p className="text-center mt-5 text-danger">{profileError}</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">{t('userPanel')}</h2>

      {/* Profil */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{t('profil')}</h5>
          <p><strong>{t("username")}:</strong> {user.username}</p>
          <p><strong>{t("email")}:</strong> {user.email}</p>
        </div>
      </div>

      {/* Zmiana hasła */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{t('changePassword')}</h5>
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              className="form-control mb-3"
              placeholder={t('oldPassword')}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder={t('newPassword')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">{t('submit')}</button>
          </form>
          {passwordMessage && <div className="mt-3 alert alert-info">{passwordMessage}</div>}
        </div>
      </div>

      {/* Usunięcie konta */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title text-center">{t('deleteAccount')}</h5>
          <button className="btn btn-danger w-100" onClick={handleDelete}>
            {t('delete')}
          </button>
          {deleteMessage && <div className="mt-3 alert alert-info">{deleteMessage}</div>}
        </div>
      </div>
    </div>
  );
}
