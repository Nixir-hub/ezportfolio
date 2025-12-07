import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login.js";
import Register from "./components/User/Register";
import Logout from "./components/User/Logout";
import UserPanel from "./components/User/User";
import Navbar from "./components/page/Navbar";
import Home from "./components/page/Home";
import PasswordReset from "./components/User/PasswordReset";
import {LanguageProvider} from "./components/contexts/language_context_provider";
import ProtectedRoute from "./components/contexts/ProtectedRoute";
import InteractiveMLChartLive from "./components/charts/InteractiveMLChartLive";



function App() {
  return (
    <>
    <LanguageProvider>
        <Navbar className="navbar" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ProtectedRoute><UserPanel /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>Dashboard</ProtectedRoute>}/>
        <Route path="/model" element={<ProtectedRoute>Model</ProtectedRoute>}/>
          <Route path="/charts" element={<ProtectedRoute><InteractiveMLChartLive /></ProtectedRoute>}/>
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>}/>
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </LanguageProvider>
    </>
  );
}

export default App;
