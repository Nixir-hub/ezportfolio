import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Logout from "../User/Logout";
import LanguageSwitcher from "./LanguageSwitcher";
import {useLanguage} from '../contexts/language_context_provider';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { t } = useLanguage()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">EZ Portfolio</Link>
        <div className="collapse navbar-collapse">
            <LanguageSwitcher />
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">{t('register')}</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">{t('profil')}</Link>
                </li>
                <li className="nav-item">
                  {user && <Logout />}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
