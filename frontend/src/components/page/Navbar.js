import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Logout from "../User/Logout";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Moje Portfolio</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">Profil</Link>
                </li>
                <li className="nav-item">
                  {user && <Logout />}
                </li>
              </>
            )}
          </ul>
            <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
