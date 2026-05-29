import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function InputPassword({ value, onChange }) {
  const [eye, setEye] = useState(false);
  const Icon = !eye ? LuEye : LuEyeOff;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ marginLeft: 8, marginBottom: 5 }}>Password</p>
      <div style={{ position: "relative" }}>
        <input
          type={eye ? "text" : "password"}
          placeholder="Password"
          value={value}
          onChange={onChange}
          style={{
            fontSize: 16,
            padding: "10px 15px",
            outline: "none",
            border: "1px solid #f0f0f0",
            borderRadius: 10,
            width: "100%",
          }}
        />
        <Icon
          onClick={() => setEye(!eye)}
          style={{
            position: "absolute",
            top: "50%",
            right: 15,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
