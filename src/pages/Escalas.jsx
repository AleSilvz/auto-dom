import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import TabelaEscalasDomingos from "../components/TabelaEscalasDomingos";
import { db } from "../firebaseConfig";
import dadosColaboradores from "../components/function/dadosColaboradores";
import dadosEscalas from "../components/function/dadosEscalas";
import Step1 from "../components/primeiroAcesso/Step1";
import { CircularProgress } from "@mui/material";
import Step2 from "../components/primeiroAcesso/Step2";
import TabelaMes from "../components/primeiroAcesso/tabelaMes";

function Escalas() {
  const [primeiroAcesso, setPrimeiroAcesso] = useState(null);
  const [passos, setPassos] = useState(0);
  const [colaboradores, setColaboradores] = useState([]);
  const [escalas, setEscalas] = useState({})

  const proximo = () => setPassos((prev) => prev + 1);
  const voltar = () => setPassos((prev) => prev - 1);

  async function verificacaoPrimeiroAcesso() {
    try {
      const docRef = collection(db, "escalas");
      const dados = (await getDocs(docRef)).empty;
      setPrimeiroAcesso(dados);
      console.log("Primeiro:", primeiroAcesso);

      const d = await dadosColaboradores();
      const e = await dadosEscalas()
      const grup = d.reduce((acc, item) => {
        if (!acc[item.funcao]) {
          acc[item.funcao] = [];
        }

        acc[item.funcao].push({ item, domingoAtual: 0 });
        return acc;
      }, {});

      setColaboradores(grup);
      setEscalas(e)
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
    console.log(colaboradores[funcao]);
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
        <CircularProgress aria-label="Loading…" />;
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      {primeiroAcesso ? steps[passos] : <TabelaMes dados={escalas}/>}
    </div>
  );
}

export default Escalas;