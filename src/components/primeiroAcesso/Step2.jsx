import { Alert, Button } from "@mui/material";
import Tabela from "./tabela";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { GerarEscala } from "../../components/function/gerarEscala";

export default function Step2({ onNext, onBack, data, update, atualizar }) {
  const [onAlert, setOnAlert] = useState(false);
  const [list, setList] = useState([]);
  const [dataDom, setDataDom] = useState({});

  function validacaoDomingo() {
    const v = Object.entries(data).map(([func, list]) =>
      list.some((item) => item.domingoAtual === 0),
    );
    return v;
  }

  useEffect(() => {
    const novaLista = Object.entries(data).flatMap(([funcao, colaborador]) =>
      colaborador.map((e) => ({
        ...e,
        domingoAtual: e.domingoAtual,
      })),
    );

    setList(novaLista);
  }, [data]);

  console.log("Step2:", list);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Primeiro acesso</h2>
          <p>Adicione o domingo atual de cada colaborador!</p>
        </div>
        <Button
          variant="contained"
          style={{ fontWeight: "600" }}
          onClick={() => GerarEscala(dataDom, list, atualizar)}
        >
          Gerar escalas
        </Button>
      </div>
      <input
        type="date"
        onChange={(e) => {
          const [ano, mes, dia] = e.target.value.split("-").map(Number);
          setDataDom({ ano, mes: mes - 1, dia });
        }}
      />
      {onAlert && (
        <Alert severity="warning">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
      <Tabela data={data} update={update} />
    </div>
  );
}
