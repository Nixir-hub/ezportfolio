import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login.js";
import Register from "./components/User/Register";
import Logout from "./components/User/Logout";
import UserPanel from "./components/User/User";
import Navbar from "./components/page/Navbar";
import Home from "./components/page/Home";
import PasswordReset from "./components/User/PasswordReset";
import PasswordResetActivation from "./components/User/PasswordResetActivation";
import {LanguageProvider} from "./components/contexts/language_context_provider";
import ProtectedRoute from "./components/contexts/ProtectedRoute";
import InteractiveMLChartLive from "./components/charts/InteractiveMLChartLive";
import PersonDetect from "./components/person_detecion/PersonDetect";
import ActivateAccount from "./components/User/ActivateAccount";



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
          <Route path="/activate/:uidb64/:token" element={<ActivateAccount />} />
        <Route path="/dashboard" element={<ProtectedRoute>Dashboard</ProtectedRoute>}/>
        <Route path="/model" element={<ProtectedRoute>Model</ProtectedRoute>}/>
        <Route path="/forgot-password" element={<PasswordReset /> }/>
        <Route path="/reset-password/:uid/:token" element={<PasswordResetActivation />}/>
          <Route path="/charts" element={<ProtectedRoute><InteractiveMLChartLive /></ProtectedRoute>}/>
          <Route path="/aiDetection" element={<ProtectedRoute><PersonDetect /></ProtectedRoute>}/>
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>}/>
      </Routes>
    </LanguageProvider>
    </>
  );
}

export default App;
