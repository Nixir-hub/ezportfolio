import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Logout from "../User/Logout";
import LanguageSwitcher from "./LanguageSwitcher";
import {useLanguage} from '../contexts/language_context_provider';
import "./Navbar.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { t } = useLanguage()

  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 fixed-top">
  <div className="container">
    <Link className="navbar-brand" to="/">EZ Portfolio</Link>

    {/* 🔥 HAMBURGER */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mainNavbar"
      aria-controls="mainNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* 🔥 NAV MENU — musi mieć ID */}
    <div className="collapse navbar-collapse" id="mainNavbar">
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
              <Link className="nav-link" to="/charts">{t('MLChart')}</Link>
            </li>
                  <li className="nav-item">
              <Link className="nav-link" to="/aiDetection">{t('humanDetection')}</Link>
            </li>

            <li className="nav-item">
              <Logout />
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>
  );
}
