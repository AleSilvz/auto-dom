import { NavLink } from "react-router-dom";
import { cors } from '../global/cors'

export default function ButtonNavSideBar({ data }) {
  const Icon = data.icon;
  return (
    <NavLink
      to={data.to}
      title={data.title}
      style={{ color: "inherit", textDecoration: "none" }}
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
          <Icon color={isActive ? cors.text : cors.text} fontSize={14} weight={"bold"}/>
          <p style={{ fontSize: 12, color: isActive ? cors.text : cors.text, fontWeight: '400' }}>
            {data.title}
          </p>
        </div>
      )}
    </NavLink>
  );
}
