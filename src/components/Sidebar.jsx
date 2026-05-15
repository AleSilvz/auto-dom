import { GoGear, GoHome, GoPeople, GoTable } from "react-icons/go";
import ButtonNavSideBar from "./buttonNavSidebar";

function Sidebar() {
  const routers = [
    { to: "/", title: "Inicio", icon: GoHome },
    { to: "/escalas", title: "Escalas", icon: GoTable },
    { to: "/colaboradores", title: "Colaboradores", icon: GoPeople },
    { to: "/configuracao", title: "Configuração", icon: GoGear },
  ];

  return (
    <div
      style={{
        display: "flex",
        padding: "20px 15px",
        backgroundColor: "#ffffff",
        // width: "15%",
        flexDirection: "column",
        gap: 20,
        borderRight: '1px solid #f1f1f1'
      }}
    >
      <h2 style={{ color: "#2b2b2b",  }}>Sys-dom</h2>
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 15,
        }}
      >
        {routers.map((e) => (
          <ButtonNavSideBar data={e} />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;