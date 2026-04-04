import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

function Home() {
  const [dadosFuncionarios, setDadosFuncionarios] = useState({});

  async function pegarDadosFirebaseFuncionarios() {
    try {
      const docRef = collection(db, "colaboradores");
      const dados = await getDocs(docRef);
      const ativos = (await getDocs(query(docRef, where("ativo", "==", true))))
        .size;

      const ferias = (
        await getDocs(query(docRef, where("status", "==", "Férias")))
      ).size;

      setDadosFuncionarios({
        Total: dados.size,
        Ativos: ativos,
        "Em férias": ferias,
        Inativo: 0,
      });

      console.log(dadosFuncionarios);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    pegarDadosFirebaseFuncionarios();
  }, []);

  const arr = [
    { title: "Total" },
    { title: "Ativos" },
    { title: "Em férias" },
    { title: "Inativo" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <div>
          <h1 style={{ fontWeight: "bold", color: "#2C333B" }}>
            Colaboradores
          </h1>
          <p style={{ color: "gray" }}>
            Gerencie sua equipe, visualize departamentos e controle o status
            operacional de toda a equipe.
          </p>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: "20px", width: "100%", marginTop: 20 }}
      >
        {arr.map((e, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              width: "15%",
              borderRadius: 20,
            }}
          >
            <h2>{e.title}</h2>
            <h1>{String(dadosFuncionarios[e.title]).padStart(3, "0")}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
