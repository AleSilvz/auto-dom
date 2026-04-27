export default function TabelaTrabalhando({ data, title }) {
  const dados = data.reduce((acc, item) => {
    if (!acc[item.funcao]) {
      acc[item.funcao] = [];
    }

    acc[item.funcao].push(item);
    return acc;
  }, {});

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

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: "400", color: "#808080" }}>
        {title}
      </p>

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
          </tr>
        </thead>

        <tbody>
          {Object.entries(dados).map(([key, e], i) =>
            e.map((e, i) => (
              <tr
                key={i}
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
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
