export default function Step1({ onNext }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: 45 }}>Primeiro acesso</h1>

      <p>
        Você precisa configurar uma escala inicial. Adicionando o domingo atual
        de cada colaborador!
      </p>
      <button onClick={onNext}>proximo</button>
    </div>
  );
}
