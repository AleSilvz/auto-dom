import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Colaboradores from "./pages/Colaboradores";
import Escalas from "./pages/escalas";
import ConfiguracaoEscalas from "./components/ConfiguracaoEscalas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
