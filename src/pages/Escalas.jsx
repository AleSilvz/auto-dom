import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import TabelaEscalasDomingos from "../components/TabelaEscalasDomingos";
import { db } from "../firebaseConfig";
import dadosColaboradores from "../components/function/dadosColaboradores";

function Escalas() {
  const [primeiroAcesso, setPrimeiroAcesso] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);

  async function verificacaoPrimeiroAcesso() {
    try {
      const docRef = collection(db, "escalas");
      const dados = await (await getDocs(docRef)).empty;
      setPrimeiroAcesso(dados);
      console.log("Primeiro:", primeiroAcesso);

      const d = await dadosColaboradores();
      const grup = d.reduce((acc, item) => {
        if (!acc[item.funcao]) {
          acc[item.funcao] = [];
        }

        acc[item.funcao].push({ item, domingoAtual: 0 });
        return acc;
      }, {});

      setColaboradores(grup);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(colaboradores);

  useEffect(() => {
    verificacaoPrimeiroAcesso();
  }, []);

  if (
    primeiroAcesso === true ||
    primeiroAcesso === null ||
    primeiroAcesso === undefined
  ) {
    return (
      <div style={{ width: "100%", height: "100%", padding: "20px" }}>
        <h1>Primeiro acesso</h1>
        <p>Configure o domingo de cada colaborador!</p>
        <br />
        {Object.entries(colaboradores).map(([funcao, lista]) => (
          <div key={funcao}>
            <h2>{funcao}</h2>

            {lista.map((pessoa, index) => (
              <>
                <p
                  key={index}
                  onClick={() => {
                    console.log(colaboradores[funcao][index]);
                  }}
                >
                  {pessoa.item.colaborador}
                </p>
                <input
                  type="number"
                  name=""
                  id=""
                  onChange={(e) => {
                    setColaboradores((prev) => ({
                      ...prev,
                      [funcao]: prev[funcao].map((item, i) => {
                        if (i === index) {
                          return {
                            ...item,
                            domingoAtual: Number(e.target.value),
                          };
                        }
                        return item;
                      }),
                    }));
                  }}
                />
              </>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      <h1>Escalas mês</h1>
      <input type="date" name="" id="" />
      <button>gerar</button>
      {/* <TabelaEscalasDomingos /> */}
    </div>
  );
}

export default Escalas;
