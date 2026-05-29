export default function Button({ t, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 15px",
        width: "100%",
        backgroundColor: "#000000",
        outline: "none",
        color: "#FFFFFF",
        fontWeight: "bold",
        border: "1px solid #f0f0f0",
        cursor: "pointer",
        borderRadius: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      {t}
    </button>
  );
}
