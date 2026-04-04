import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/escalas">Escalas</Link>
        <Link to="/colaboradores">Colaboradores</Link>
        <Link to="/configuracao">Configuração</Link>
        <Link to="/sobre">Sobre</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
