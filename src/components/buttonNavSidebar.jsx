import { NavLink } from "react-router-dom";

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
            gap: 10,
            padding: "5px 10px",
          }}
        >
          <Icon color={isActive ? "#007bff" : "#a5a5a5"} fontSize={20} />
          <p style={{ fontSize: 15, color: isActive ? "#007bff" : "#a5a5a5" }}>
            {data.title}
          </p>
        </div>
      )}
    </NavLink>
  );
}
