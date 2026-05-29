import { useNavigate } from "react-router-dom";

export default function LoginOrSignUp({ t, p, to }) {
  const navigate = useNavigate();
  return (
    <span
      style={{
        display: "flex",
        gap: 5,
        fontSize: 14,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <p>{t}</p>{" "}
      <p
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate(to)}
      >
        {p}
      </p>
    </span>
  );
}
