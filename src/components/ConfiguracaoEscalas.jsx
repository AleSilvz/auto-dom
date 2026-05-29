import { useState } from "react";
import DragDiv from "../components/DragDiv";
import { GerarEscala } from "../components/function/gerarEscala";

function ConfiguracaoEscalas() {
  const [date, setDate] = useState("");

  return (
    <div style={{ position: "relative" }}>
      <h1>Configuração Escalas</h1>

      {/* <DragDiv /> */}
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={() => GerarEscala(date)}>TESTE</button>
    </div>
  );
}

export default ConfiguracaoEscalas;
