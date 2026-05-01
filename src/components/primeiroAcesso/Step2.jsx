import { Alert, Button } from "@mui/material";
import Tabela from "./tabela";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Step2({ onNext, onBack, data, update }) {
  const [onAlert, setOnAlert] = useState(false);
  const [list, setList] = useState([])
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
        colaborador: e.item,
        domingoAtual: e.domingoAtual
      }))
    );

    setList(novaLista);
  }, [data]);

  function GerarEscalaAnual() {
    const { ano, mes, dia } = dataDom;
    const resultado = []

    for (let mm = mes; mm < 12; mm++) {
      const domMes = []
      const dataAtual = new Date(ano, mm, 1)

      while (dataAtual.getMonth() === mm) {
        if (dataAtual.getDay() === 0) {
          domMes.push(new Date(dataAtual))
        }

        dataAtual.setDate(dataAtual.getDate() + 1)
      }

      const escalaMes = []

      list.map((e) => {
        const limite = e.colaborador.sexo === "Masculino" ? 3 : 2
        let contador = e.domingoAtual

        const trabalha = []

        domMes.forEach((domingo) => {
          if (contador <= limite) {
            trabalha.push(domingo.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            }))

            contador++
          } else {
            contador = 1
          }
        })

        e.domingoAtual = contador

        escalaMes.push({
          colaborador: e.colaborador,
          trabalha,
          domingoAtual: contador
        })
      })

      resultado.push({
        mes: new Date(2026, mm).toLocaleDateString("pt-BR", {
          month: "long",
        }),
        colaboradores: escalaMes,
        domingos: domMes
      })
    }

    EnviarEscalaAnualFirebase(resultado, ano)
  }

  async function EnviarEscalaAnualFirebase(dados, ano) {
    try {

      const docRefC = doc(db, "escalas", String(ano))
      const docRef = collection(db, "escalas", String(ano), 'meses')

      const snapshot = await getDocs(docRef)

      if (!snapshot.empty) {
        console.log("Dados já existem!")
        return
      }

      for (const e of dados) {
        await addDoc(docRef, { mes: e.mes, colaboradores: e.colaboradores, domingos: e.domingos })
      }

      await setDoc(docRefC, { date: new Date() })
    } catch (error) {
      console.error(error)
    }
  }

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
          onClick={GerarEscalaAnual}
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
      {
        onAlert && (
          <Alert severity="warning">
            Here is a gentle confirmation that your action was successful.
          </Alert>
        )
      }
      <Tabela data={data} update={update} />
    </div >
  );
}
