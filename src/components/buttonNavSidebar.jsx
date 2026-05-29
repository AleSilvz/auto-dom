import { NavLink } from "react-router-dom";
import { cors } from "../global/cors";

import "./styles/buttonNavSidebar.css";

export default function ButtonNavSideBar({ data, i }) {
  const Icon = data.icon;
  return (
    <NavLink
      key={i}
      className="buttonNavSideBar-b"
      to={data.to}
      title={data.title}
      end={data.to === "/app"}
    >
      {({ isActive }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 15px",
            backgroundColor: isActive && cors.fundo,
            borderRadius: 5,
          }}
        >
          <Icon
            color={isActive ? cors.text : 'gray'}
            fontSize={18}
          />
          <p
            style={{
              fontSize: 15,
              color: isActive ? cors.text : "gray",
              fontWeight: "600",
            }}
          >
            {data.title}
          </p>
        </div>
      )}
    </NavLink>
  );
}
