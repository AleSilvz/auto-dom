import { fonts, cors } from '../global/cors'

export default function TimelineDemo({ d }) {
  const inicioDia = 6;
  const fimDia = 22;
  const totalColunas = (fimDia - inicioDia) * 2;

  function horaParaNumero(hora) {
    if (!hora || typeof hora !== "string") {
      return 0;
    }

    const [h, m] = hora.split(":").map(Number);

    return h + m / 60;
  }

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

  const funcionariosOrdenados = [...d.trabalhandoHoje].sort((a, b) => {
    const inicioA = horaParaNumero(a?.horario?.entrada);
    const inicioB = horaParaNumero(b?.horario?.entrada);

    return inicioA - inicioB;
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
        height: "55%",
        width: "100%",
        backgroundColor: cors.white,
        borderRadius: 20,
        padding: "15px 0px 25px 25px",
        border: `1px solid ${cors.border}` 
      }}
    >
      <h1
        style={{
          fontSize: fonts.medio,
          fontWeight: "bold",
          marginBottom: 15,
          gridColumn: `1 / ${totalColunas + 1}`,
        }}
      >
        Timeline de Horários
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
          overflowY: "auto",
          scrollbarWidth: "none",
          gridColumn: `1 / ${totalColunas + 1}`,
          paddingRight: 1
        }}
      >
        <div
          style={{
            position: "relative",
            gridColumn: `1 / ${totalColunas + 1}`,
            gap: 20,
            display: "grid",
            gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: totalColunas + 1 }).map((_, i) => (
            <div
              key={`linha-${i}`}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                zIndex: 0,
                width: 1,
                background: "#e4e4e7",
                left: `${(i / totalColunas) * 100}%`,
              }}
            />
          ))}

          {funcionariosOrdenados.map((e) => {
            console.log(e);
            const array = [
              {
                inicio: e.horario.entrada,
                fim: e.horario.entradaIntervalo,
              },
              {
                inicio: e.horario.saidaIntervalo,
                fim: e.horario.saida,
              },
            ];

            return (
              <div style={{ zIndex: 1, gridColumn: `1 / ${totalColunas + 1}` }}>
                <p style={{ left: 10, position: "relative", marginBottom: 10, fontSize: fonts.pequeno }}>
                  {capitalizarNome(e.colaborador)}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${totalColunas}, minmax(0, 1fr))`,
                    position: "relative",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  {array.map((evento, index) => {
                    const inicio = horaParaNumero(evento?.inicio);
                    const fim = horaParaNumero(evento?.fim);

                    if (Number.isNaN(inicio) || Number.isNaN(fim)) {
                      return null;
                    }

                    const colunaInicio =
                      Math.floor((inicio - inicioDia) * 2) + 1;
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
            );
          })}
        </div>

      </div>
        {Array.from({ length: fimDia - inicioDia + 1 }).map((_, i) => {
          const hora = inicioDia + i;
          return (
            <p
              style={{
                gridColumn: `${i * 2 + 1}`,
                fontSize: 12,
                left: -15,
                position: "relative",
                color: "gray",
                top: 10,
                zIndex: 15,
              }}
            >
              {String(hora).padStart(2, "0")}:00
            </p>
          );
        })}
    </div>
  );
}
