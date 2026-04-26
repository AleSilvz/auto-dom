import { GoGear, GoHome, GoPeople, GoSignOut, GoTable } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          backgroundColor: "#f8f8f8",
          height: "100%",
          borderRadius: 50,
          padding: "20px 10px",
          border: "1px solid #e4e4e4",
        }}
      >
        <NavLink to="/" title="Inicio" end>
          {({ isActive }) => (
            <GoHome color={isActive ? "#007bff" : "#555"} fontSize={25} />
          )}
        </NavLink>

        <NavLink to="/escalas" title="Escalas">
          {({ isActive }) => (
            <GoTable color={isActive ? "#007bff" : "#555"} fontSize={25} />
          )}
        </NavLink>

        <NavLink to="/colaboradores" title="Colaboradores">
          {({ isActive }) => (
            <GoPeople color={isActive ? "#007bff" : "#555"} fontSize={25} />
          )}
        </NavLink>

        <NavLink to="/configuracao" title="Configuração">
          {({ isActive }) => (
            <GoGear color={isActive ? "#007bff" : "#555"} fontSize={25} />
          )}
        </NavLink>

        <GoSignOut fontSize={25} title="Sair" />
      </nav>
    </div>
  );
}

export default Sidebar;
