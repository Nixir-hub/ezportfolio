import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {useLanguage} from '../contexts/language_context_provider';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const { t } = useLanguage()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // usuwa tokeny + czyści user
    navigate("/");   // przekierowanie
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
        {t('logout')}
    </button>
  );
}
