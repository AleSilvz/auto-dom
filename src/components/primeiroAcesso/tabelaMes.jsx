import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TabelaDomingoAnual from "../TabelaDomingoAnual";
import { cors, fonts } from "../../global/cors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Modal from "../Modal";

export default function TabelaMes({ dados }) {
  const [current, setCurrent] = useState(0);
  const [mesSelecionado, setMesSelecionado] = useState(0);
  const [colaborador, setColaborador] = useState({});
  const [mo, setMo] = useState(false);

  if (!dados?.length) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress aria-label="Loading…" color="#000000" />
      </div>
    );
  }

  const mesAtual = new Date().toLocaleDateString("pt-BR", { month: "long" });

  const ordemMeses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const agrupar = dados.reduce((acc, item) => {
    const [, mes] = item.uid.split("-");
    const nomeMes = ordemMeses[mes - 1];
    if (!acc[nomeMes]) {
      acc[nomeMes] = [];
    }

    acc[nomeMes].push({
      ...item,
      data: item.data.reduce((grupos, registro) => {
        const funcao = registro.colaborador.funcao;

        if (!grupos[funcao]) {
          grupos[funcao] = [];
        }

        grupos[funcao].push(registro);

        return grupos;
      }, {}),
    });

    return acc;
  }, {});

  const mesesOrdenados = Object.entries(agrupar)
    .sort(([a], [b]) => {
      const indexA = ordemMeses.indexOf(a);
      const indexB = ordemMeses.indexOf(b);

      return indexA - indexB;
    })
    .map(([key, valor]) => ({
      mes: key,
      dados: valor,
    }));

  const mm = mesesOrdenados[current];

  const nomeDoMes =
    String(mm.mes).charAt(0).toUpperCase() + String(mm.mes).slice(1);

  const proximo = () => {
    setMesSelecionado(0);
    setCurrent((prev) => (prev + 1) % mesesOrdenados.length);
  };

  const anterior = () => {
    setMesSelecionado(0);
    setCurrent(
      (prev) => (prev - 1 + mesesOrdenados.length) % mesesOrdenados.length,
    );
  };

  const fun = {
    p: { title: "proximo", action: proximo },
    v: { title: "voltar", action: anterior },
  };

  function capitalizarNome(nome) {
    const excecoes = ["da", "de", "do", "das", "dos", "e"];
    return String(nome)
      .toLowerCase()
      .split(" ")
      .map((palavra) =>
        excecoes.includes(palavra)
          ? palavra
          : palavra.charAt(0).toUpperCase() + palavra.slice(1),
      )
      .join(" ");
  }

  return (
    <div
      style={{
        backgroundColor: cors.white,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        border: `1px solid ${cors.border}`,
        borderRadius: 20,
        gap: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            padding: "5px 15px",
            border: `1px solid ${cors.border}`,
            color: cors.text,
            backgroundColor: cors.white,
            borderRadius: 20,
            fontSize: fonts.pequeno,
          }}
          onClick={fun.v.action}
        >
          voltar
        </button>
        <h1 style={{ fontSize: fonts.grande }}>{nomeDoMes}</h1>
        <button
          style={{
            padding: "5px 15px",
            border: `1px solid ${cors.border}`,
            color: cors.text,
            backgroundColor: cors.white,
            borderRadius: 20,
            fontSize: fonts.pequeno,
          }}
          onClick={fun.p.action}
        >
          proximo
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          border: `1px solid ${cors.border}`,
          borderRadius: 20,
          padding: 5,
        }}
      >
        {mm?.dados.map((domingo, i) => (
          <p
            key={i}
            style={{
              backgroundColor: i === mesSelecionado ? cors.text : "white",
              padding: "5px 15px",
              color: i === mesSelecionado ? cors.white : cors.text,
              border: `1px solid ${cors.border}`,
              borderRadius: 20,
              cursor: "pointer",
            }}
            onClick={() => setMesSelecionado(() => i)}
          >
            {domingo.uid}
          </p>
        ))}
      </div>

      {Object.entries(mm.dados[mesSelecionado].data).map(
        ([funcao, element]) => {
          const colaboradoresFiltrados = Object.values(
            mm.dados[mesSelecionado].folga,
          ).filter((item) => item.colaborador.funcao === funcao);

          return (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",

                  backgroundColor: cors.text,
                  padding: "10px 20px",
                  borderRadius: "10px 10px 0 0",
                  border: `1px solid ${cors.border}`,
                }}
              >
                <h1
                  style={{
                    color: cors.text,
                    fontSize: fonts.medio,
                    color: cors.white,
                  }}
                >
                  {funcao}
                </h1>
                <h1
                  style={{
                    color: cors.text,
                    fontSize: fonts.medio,
                    color: cors.white,
                  }}
                >
                  {String(element.length).padStart(2, "0")}
                </h1>
              </div>

              <div style={{ display: "flex" }}>
                <table
                  style={{
                    width: "65%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f7f7f7",
                        border: `1px solid ${cors.border}`,
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          fontWeight: "500",
                        }}
                      >
                        COLABORADORES
                      </th>

                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          fontWeight: "500",
                          borderLeft: `1px solid ${cors.border}`,
                        }}
                      >
                        HORÁRIO
                      </th>

                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          fontWeight: "500",
                          borderLeft: `1px solid ${cors.border}`,
                        }}
                      >
                        FOLGAS FIXAS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {element.map((p, i) => {
                      const colaborador = p.colaborador;
                      return (
                        <tr
                          onClick={() => {
                            setColaborador(colaborador);
                            setMo(!mo);
                          }}
                          key={i}
                          style={{
                            borderBottom: `1px solid ${cors.border}`,
                            borderLeft: `1px solid ${cors.border}`,
                            borderRight: `1px solid ${cors.border}`,
                          }}
                        >
                          <td
                            style={{
                              padding: "12px",
                              fontSize: fonts.pequeno,
                              borderRight: `1px solid ${cors.border}`,
                              cursor: "pointer",
                            }}
                          >
                            {String(
                              capitalizarNome(colaborador.colaborador),
                            ).toLocaleUpperCase()}
                          </td>

                          <td
                            style={{
                              padding: "12px",
                              borderRight: `1px solid ${cors.border}`,
                              fontSize: fonts.pequeno,
                            }}
                          >
                            {colaborador.horario.entrada} ÀS{" "}
                            {colaborador.horario.entradaIntervalo} /{" "}
                            {colaborador.horario.saidaIntervalo} ÀS{" "}
                            {colaborador.horario.saida}
                          </td>

                          <td
                            style={{ padding: "12px", fontSize: fonts.pequeno }}
                          >
                            {String(colaborador.folgaFixa).toLocaleUpperCase()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <table
                  style={{
                    width: "35%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f7f7f7",
                        border: `1px solid ${cors.border}`,
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          fontWeight: "500",
                          borderLeft: `1px solid ${cors.border}`,
                        }}
                      >
                        FOLGANDO
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {colaboradoresFiltrados.length > 0
                      ? colaboradoresFiltrados.map((item, index) => (
                          <tr
                            style={{
                              borderBottom: `1px solid ${cors.border}`,
                              borderLeft: `1px solid ${cors.border}`,
                              borderRight: `1px solid ${cors.border}`,
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                fontSize: fonts.pequeno,
                              }}
                            >
                              {capitalizarNome(
                                item.colaborador.colaborador,
                              ).toUpperCase()}
                            </td>
                          </tr>
                        ))
                      : Array.from({ length: element.length }).map((_, i) => {
                          
                          return (
                            <tr
                              key={i}
                              style={{
                                borderBottom: `1px solid ${cors.border}`,
                                borderLeft: `1px solid ${cors.border}`,
                                borderRight: `1px solid ${cors.border}`,
                              }}
                            >
                              <td
                                style={{
                                  padding: "12px",
                                  fontSize: fonts.pequeno,
                                }}
                              >
                                {""}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        },
      )}

      <Modal show={mo}>
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          <button onClick={() => setMo(!mo)}>fechar</button>

          <h3>
            Colaborador:{" "}
            {capitalizarNome(colaborador.colaborador).toLocaleUpperCase()}
          </h3>
        </div>
      </Modal>
    </div>
  );
}
