import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { apiFetch } from "../../api";
import {useLanguage} from '../../language_context_provider';

export default function Logout() {
  const { logout } = useContext(AuthContext); // <- używamy funkcji logout
  const navigate = useNavigate();
  const { t } = useLanguage()

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");

    try {
      if (refresh) {
        await apiFetch("http://localhost:8000/logout/", {
          method: "POST",
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (err) {
      console.error("Błąd podczas wylogowania:", err);
    } finally {
      logout();     // <- czyści tokeny i stan usera
      navigate("/");
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
        {t('logout')}
    </button>
  );
}
