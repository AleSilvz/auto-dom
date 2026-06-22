import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import dadosColaboradores from "../components/function/dadosColaboradores";
import dadosEscalas from "../components/function/dadosEscalas";
import Step1 from "../components/primeiroAcesso/Step1";
import { CircularProgress } from "@mui/material";
import Step2 from "../components/primeiroAcesso/Step2";
import TabelaMes from "../components/primeiroAcesso/tabelaMes";
import { cors } from "../global/cors";

function Escalas() {
  const [primeiroAcesso, setPrimeiroAcesso] = useState(null);
  const [passos, setPassos] = useState(0);
  const [colaboradores, setColaboradores] = useState([]);
  const [escalas, setEscalas] = useState({});

  const proximo = () => setPassos((prev) => prev + 1);
  const voltar = () => setPassos((prev) => prev - 1);

  async function verificacaoPrimeiroAcesso() {
    try {
      const docRef = query(collection(db, "escalas"), limit(1));
      const snapshot = await getDocs(docRef);
      const primeiroAcesso = snapshot.empty;
      setPrimeiroAcesso(primeiroAcesso);

      console.log("Primeiro:", primeiroAcesso);

      const [d, e] = await Promise.all([dadosColaboradores(), dadosEscalas()]);

      const group = d.reduce((acc, e) => {
        if (!acc[e.col.funcao]) {
          acc[e.col.funcao] = [];
        }

        const i = e.col;

        acc[e.col.funcao].push({
          uid: e.uid,
          colaborador: i.colaborador,
          sexo: i.sexo,
          folgaFixa: i.folgaFixa,
          horario: i.horario,
          funcao: i.funcao,
        });

        return acc;
      }, {});

      setColaboradores(group);
      setEscalas(e);
      console.log("Carregando dados...");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    verificacaoPrimeiroAcesso();
  }, []);

  function domingoAtual(funcao, index, domingoAtual) {
    setColaboradores((prev) => ({
      ...prev,
      [funcao]: prev[funcao].map((e, i) =>
        i === index ? { ...e, domingoAtual: Number(domingoAtual) } : e,
      ),
    }));
  }

  const steps = [
    <Step1 onNext={proximo} />,
    <Step2
      onNext={proximo}
      onBack={voltar}
      data={colaboradores}
      update={domingoAtual}
    />,
  ];

  if (primeiroAcesso === null) {
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
        backgroundColor: cors.background,
        overflowY: "auto",
      }}
    >
      {primeiroAcesso ? steps[passos] : <TabelaMes dados={escalas} />}
    </div>
  );
}

export default Escalas;
