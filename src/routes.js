import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { getItem } from "./store";
import Login from "./Pages/Login";
import Signup from "./Pages/Sign-up";
import Home from "./Pages/Home";

export default function MainRoutes() {
  // Rota protegina, função para verificação de autenticação.
  function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem("token");
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return (
    // Define rotas existentes
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>

      {/* Se auteticado, redireciona para "home". Senão, redireciona para "login" */}
      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
