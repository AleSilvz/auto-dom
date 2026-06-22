export default function Tabela({ data, update }) {

  function capitalizarNome(nome) {
    const excecoes = ["da", "de", "do", "das", "dos", "e"];
    return nome
      .toLowerCase()
      .split(" ")
      .map((palavra) =>
        excecoes.includes(palavra)
          ? palavra
          : palavra.charAt(0).toUpperCase() + palavra.slice(1),
      )
      .join(" ");
  }

  const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 14,
    color: "#f5f5f5",
    fontWeight: "600",
  };

  const tdStyle = {
    padding: "12px 16px",
    fontSize: 14,
    color: "#333",
  };

  function selecionar(num, index, funcao, id) {
    return (
      <div style={{ display: "flex", gap: 15 }}>
        {Array.from({ length: num }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i === index - 1 ? "#b7ffbd" : "#ebebeb",
              border: "1px solid #e2e2e2",
              padding: "10px 15px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 12,
            }}
            onClick={() => update(funcao, id, i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <thead style={{ backgroundColor: "#3c7aff" }}>
          <tr>
            <th style={thStyle}>Colaborador</th>
            <th style={thStyle}>Função</th>
            <th style={thStyle}>Folga Fixa</th>
            <th style={thStyle}>Horário</th>
            <th style={thStyle}>Domingo Atual</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([key, list], i) =>
            list.map((e, index) => (
              <tr
                key={index}
                style={{
                  borderTop: "1px solid #eee",
                  transition: "0.2s",
                }}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.background = "#fafafa")
                }
                onMouseLeave={(ev) =>
                  (ev.currentTarget.style.background = "transparent")
                }
              >
                <td style={tdStyle}>{capitalizarNome(e.colaborador)}</td>
                <td style={tdStyle}>{e.funcao}</td>
                <td style={tdStyle}>{e.folgaFixa}</td>
                <td style={tdStyle}>{e.horario?.entrada}</td>
                <td>
                  {/* <input
                    type="number"
                    min={1}
                    max={3}
                    onChange={(e) => update(key, index, e.target.value)}
                  /> */}
                  {e.sexo === "Masculino"
                    ? selecionar(3, e.domingoAtual, key, index)
                    : selecionar(2, e.domingoAtual, key, index)}
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
