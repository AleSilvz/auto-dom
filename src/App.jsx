import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Colaboradores from "./pages/Colaboradores";
import ConfiguracaoEscalas from "./components/ConfiguracaoEscalas";
import Escalas from "./pages/Escalas";
import Login from "./pages/authentication/login/Login";
import SignUp from "./pages/authentication/signUp/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={"/app"} /> : <Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/app"
        element={
          <PrivateRoute user={user}>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="escalas" element={<Escalas />} />
        <Route path="colaboradores" element={<Colaboradores />} />
        <Route path="configuracao" element={<ConfiguracaoEscalas />} />
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}

export default App;
