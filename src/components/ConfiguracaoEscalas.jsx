import { useState } from "react";
import DragDiv from "../components/DragDiv";
import { GerarEscala } from "../components/function/gerarEscala";

function ConfiguracaoEscalas() {
  const [date, setDate] = useState("");

  function gerar() {
    const [aaa, mmm, ddd] = date.split("-").map(Number);
    const dias = [];

    const data = new Date(aaa, mmm - 1, ddd);

    while (data.getMonth() === mmm - 1) {
      if (data.getDay() === 0) {
        dias.push(new Date(data).toLocaleDateString("pt-BR"));
      }
      data.setDate(data.getDate() + 1);
    }

    console.log(dias);
  }

  return (
    <div style={{ position: "relative" }}>
      <h1>Configuração Escalas</h1>
      <h2>Date: {date}</h2>

      {/* <DragDiv /> */}
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={gerar}>TESTE</button>
    </div>
  );
}

export default ConfiguracaoEscalas;
