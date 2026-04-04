import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoIosAlarm, IoIosPaper, IoMdMore } from "react-icons/io";
import { db } from "../firebaseConfig";
import "./styles/tabelaColaboradores.css";

function TabelaColaboradores({ funcModal, colabSelect }) {
  const [selectCurrent, setSelectCurrent] = useState("Todos");
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const docRef = collection(db, "colaboradores");

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        ID: doc.id,
        ...doc.data(),
      }));

      setDados(lista);
    });

    return () => unsubscribe();
  }, []);

  const funcao = [
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

  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalItens = 4;

  const inicio = (paginaAtual - 1) * totalItens;
  const final = inicio + totalItens;

  const dadosTabela = dados.slice(inicio, final);
  const totalPaginas = Math.ceil(dados.length / totalItens);

  const verificacao = selectCurrent === "Todos";

  const resultado = verificacao
    ? dadosTabela
    : dados.filter((e) => e.funcao === selectCurrent);

  return (
    <div>
      <div className="tabela">
        <div style={{ display: "flex", gap: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F5F0FE",
              width: "50px",
              height: "50px",
              borderRadius: "20px",
            }}
          >
            <IoIosPaper size={25} color="#665882" />
          </div>
          <div>
            <h1>{selectCurrent}</h1>
            <p>Time and attendance control</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h3 style={{ color: "#137ee2", cursor: "pointer" }}>Expotar PDF</h3>

          <select
            onChange={(e) => setSelectCurrent(e.target.value)}
            about="Filter"
          >
            <option value={"Todos"}>Todos</option>
            {funcao.map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", backgroundColor: "#f5f5f5" }}>
            <th
              style={{
                padding: "20px 20px",
                fontSize: "12px",
                // fontWeight: "700",
                color: "#2e2e2e",
              }}
            >
              COLABORADORES
            </th>
            <th>FUNÇÂO</th>
            <th>SEXO</th>
            <th>HORÁRIO</th>
            <th>FOLGA FIXA</th>
            <th>ATIVO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {resultado.map((e, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #E5E7EB",
                padding: "20px 20px",
              }}
            >
              <td style={{ padding: "20px 20px" }}>
                {e.colaborador.toUpperCase()}
                <br />#{e.ID}
              </td>
              <td>{e.funcao}</td>
              <td>{e.sexo}</td>
              <td>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "center",
                  }}
                >
                  <IoIosAlarm />

                  <p>
                    {e.horario.entrada} ÀS {e.horario.entradaIntervalo} <br />{" "}
                    {e.horario.saidaIntervalo} ÀS {e.horario.saida}
                  </p>
                </span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: "#cbdbfc",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3f3f3f",
                  }}
                >
                  {e.folgaFixa}
                </span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: e.ativo ? "#cff7d4" : "#d1d1d1",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3f3f3f",
                  }}
                >
                  {e.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td style={{ textAlign: "center", cursor: "pointer" }}>
                <span
                  onClick={() => {
                    colabSelect({ ...e });
                    funcModal();
                  }}
                >
                  <IoMdMore />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div>
          <p style={{ color: "gray", fontSize: "15px" }}>
            Mostrando <span style={{ fontWeight: "bold" }}>{paginaAtual}</span>{" "}
            de <span style={{ fontWeight: "bold" }}>{totalPaginas}</span>{" "}
            páginas
          </p>
        </div>
        <div style={{ gap: "20px", display: "flex" }}>
          <button
            onClick={() => setPaginaAtual((e) => e - 1)}
            disabled={paginaAtual === 1}
            style={{
              backgroundColor: "transparent",
              border: "1px solid gray",
              padding: "10px 20px",
              color: "black",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            Anterior
          </button>
          <button
            onClick={() => setPaginaAtual((e) => e + 1)}
            disabled={paginaAtual === totalPaginas}
            style={{
              backgroundColor: "transparent",
              border: "1px solid gray",
              padding: "10px 20px",
              color: "black",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default TabelaColaboradores;
