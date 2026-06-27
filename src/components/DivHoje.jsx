import { cors } from "../../src/global/cors";

export default function DivHoje({ dados, m }) {
  const { folgandoHoje, trabalhandoHoje } = dados;

  const funcaoF = [
    "Fiscal",
    "Operador",
    "Selfiecheckout",
    "Repositor",
    "Hortifrut",
    "Padaria",
    "Açougue",
    "Prevenção",
    "Ecommerce",
    "Limpeza",
    "Noturno",
  ];

  const arr = {
    trabalhando: trabalhandoHoje.reduce((acc, e) => {
      if (!acc[e.funcao]) {
        acc[e.funcao] = [];
      }

      acc[e.funcao].push(e);

      return acc;
    }, {}),
    folgando: folgandoHoje.reduce((acc, e) => {
      if (!acc[e.funcao]) {
        acc[e.funcao] = [];
      }

      acc[e.funcao].push(e);

      return acc;
    }, {}),
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "5%",
        width: "35%",
        backgroundColor: cors.white,
        border: `1px solid ${cors.border}`,
        borderRadius: 20,
        padding: 20,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>Hoje</h2>
        <span
          style={{
            display: "flex",
            width: "50%",
            justifyContent: "flex-end",
            gap: 30,
          }}
        >
          <h2>F</h2>
          <h2>T</h2>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 170,
          overflowY: "auto",
        }}
      >
        {funcaoF.map((e, i) => {
          const f = Object.fromEntries(
            Object.entries(arr.folgando).filter(([key, valor]) => e === key),
          );
          const t = Object.fromEntries(
            Object.entries(arr.trabalhando).filter(([key, valor]) => e === key),
          );

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => m(e, t, f)}
            >
              <p>{e}</p>
              <span
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "flex-end",
                  gap: 30,
                }}
              >
                <p >
                  {String(f[e]?.length || 0).padStart(2, "0")}
                </p>
                <p >
                  {String(t[e]?.length || 0).padStart(2, "0")}
                </p>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
