export default function InputEmail({ t, p, value, onChange }) {

  return (
    <div>
      <p style={{ marginLeft: 8, marginBottom: 5 }}>{t}</p>
      <input
        type="email"
        placeholder={p}
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
    </div>
  );
}
