import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login.js";
import Register from "./components/User/Register";
import Logout from "./components/User/Logout";
import UserPanel from "./User";
import Navbar from "./components/page/Navbar";
import Home from "./components/page/Home";
import PasswordReset from "./components/User/PasswordReset";
import {LanguageProvider} from "./language_context_provider";


function App() {
  return (
    <>
    <LanguageProvider>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </LanguageProvider>
    </>
  );
}

export default App;
