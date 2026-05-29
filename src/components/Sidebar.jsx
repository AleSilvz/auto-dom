import { GoGear, GoHome, GoPeople, GoTable } from "react-icons/go";
import { LuHouse, LuLogOut } from "react-icons/lu";

import ButtonNavSideBar from "./buttonNavSidebar";

import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

import "./styles/sideBar.css";

function Sidebar() {
  const user = auth?.currentUser;
  const navigate = useNavigate();

  const routers = [
    { to: "/app", title: "Dashboard", icon: LuHouse },
    { to: "/app/escalas", title: "Schedules", icon: GoTable },
    { to: "/app/colaboradores", title: "Employees", icon: GoPeople },
    { to: "/app/configuracao", title: "Settings", icon: GoGear },
  ];

  async function Out() {
    try {
      await signOut(auth);

      alert("Deslogado");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sidebar-b">
      <div className="sidebar-user-d">
        <p className="sidebar-hello">Hello!</p>
        <h2 className="user-name">{String(user.displayName).toUpperCase()}</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: 20,
        }}
      >
        <nav className="sidebar-content">
          {routers.map((e, i) => (
            <ButtonNavSideBar data={e} i={i} />
          ))}
        </nav>

        <div
          onClick={Out}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "white",

              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            Logout
          </p>
          <LuLogOut color="white" fontSize={18} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
