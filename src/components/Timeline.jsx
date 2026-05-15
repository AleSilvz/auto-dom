export default function Timeline() {
  function horaParaNumero(hora) {
    if (!hora || typeof hora !== "string") {
      return 0;
    }

    const [h, m] = hora.split(":").map(Number);

    return h + m / 60;
  }

  const funcionarios = [
    {
      nome: "Your name",
      horarios: [
        {
          inicio: "12:30",
          fim: "16:00",
        },
        {
          inicio: "18:00",
          fim: "22:00",
        },
      ],
    },
  ];

  const funcionariosOrdenados = [...funcionarios].sort((a, b) => {
    const inicioA = horaParaNumero(a?.horarios?.[0]?.inicio);
    const inicioB = horaParaNumero(b?.horarios?.[0]?.inicio);

    return inicioA - inicioB;
  });

  const inicioDia = 6;
  const fimDia = 22;
  const totalColunas = (fimDia - inicioDia) * 2;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f5",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "white",
          padding: 32,
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 32,
          }}
        >
          Timeline de Horários
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          {funcionariosOrdenados.map((funcionario, funcionarioIndex) => (
            <div key={funcionarioIndex}>
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3f3f46",
                }}
              >
                {funcionario.nome}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
                  position: "relative",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {funcionario.horarios.map((evento, index) => {

                    

                  const inicio = horaParaNumero(evento?.inicio);
                  const fim = horaParaNumero(evento?.fim);

                  if (Number.isNaN(inicio) || Number.isNaN(fim)) {
                    return null;
                  }

                  const colunaInicio = Math.floor((inicio - inicioDia) * 2) + 1;
                  const colunaFim = Math.ceil((fim - inicioDia) * 2) + 1;

                  return (
                    <div
                      key={index}
                      style={{
                        gridColumn: `${colunaInicio} / ${colunaFim}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: 12,
                          background: "black",
                          borderRadius: 999,
                        }}
                      />

                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 11,
                          color: "#71717a",
                        }}
                      >
                        {evento.inicio} → {evento.fim}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
            fontSize: 12,
            // color: "#52525b",
            // gap: "1px",
            // backgroundColor: "#e4e4e7",
          }}
        >
          {Array.from({ length: fimDia - inicioDia + 1 }).map((_, i) => {
            const hora = inicioDia + i;

            return (
              <div
                key={hora}
                style={{
                  gridColumn: `${i * 2 + 1}`,
                  // transform: "translateX(-50%)",
                  borderLeft: "1px solid #e4e4e7",
                  borderRight: "1px solid #e4e4e7",
                  alignItems: 'center'
                }}
              >
                {String(hora).padStart(2, "0")}:00
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
