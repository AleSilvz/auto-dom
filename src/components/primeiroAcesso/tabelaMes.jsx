import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TabelaDomingoAnual from "../TabelaDomingoAnual";
import { cors, fonts } from "../../global/cors";

export default function TabelaMes({ dados }) {
  const [current, setCurrent] = useState(0);
  const [mesSelecionado, setMesSelecionado] = useState(0);

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

  const mesesOrdenados = Object.entries(dados)
    .sort(([mesA], [mesB]) => {
      const indexA = ordemMeses.indexOf(mesA);
      const indexB = ordemMeses.indexOf(mesB);
      return indexA - indexB;
    })
    .map(([mes, valor]) => ({
      mes,
      ...valor,
    }));

  useEffect(() => {
    const indexInicial = mesesOrdenados.findIndex(
      (m) => m.mes.toLowerCase() === mesAtual,
    );

    if (indexInicial !== -1) {
      setCurrent(indexInicial);
    }
  }, []);

  const p = mesesOrdenados[current];
  const mes = String(p?.mes).charAt(0).toUpperCase() + String(p?.mes).slice(1);

  const list = p?.domingos?.map((domingo) => {
    const dom = domingo.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
    return dom;
  });

  const trabalhando = Object.entries(p?.funcoes || {}).map(
    ([funcao, lista]) => {
      return {
        funcao,
        pessoas: lista.filter((l) =>
          l.colab.trabalha?.some((c) => c === list[mesSelecionado]),
        ),
      };
    },
  );

  if (!dados || !mesesOrdenados.length || !p) {
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
        <CircularProgress aria-label="Loading…" />;
      </div>
    );
  }

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
  console.log(dados)
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
        <h1 style={{ fontSize: fonts.grande }}>{mes}</h1>
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
        {list?.map((domingo, i) => (
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
            {domingo}
          </p>
        ))}
      </div>

      {trabalhando.map((e) => (
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
                fontSize: fonts.grande,
                color: cors.white,
              }}
            >
              {e.funcao}
            </h1>
            <h1
              style={{
                color: cors.text,
                fontSize: fonts.grande,
                color: cors.white,
              }}
            >
              {String(e.pessoas.length).padStart(2, "0")}
            </h1>
          </div>

          {e.pessoas.map((p, i) => (
            <div
              style={{
                padding: "10px 20px",
                border: `1px solid ${cors.border}`,
                display: 'flex',
                gap: 20
              }}
            >
              <p style={{ fontSize: fonts.medio }}>
                {capitalizarNome(p.colab.colaborador.colaborador)}
              </p>
              <p style={{ fontSize: fonts.medio }}>
                {p.colab.colaborador.horario.entrada}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
