import { db } from "../../firebaseConfig";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function GerarEscala(date, dados) {
  // console.log("GerarEscala:", dados)

  if (!date.ano) {
    alert("Selecione uma data inicial!");
    return;
  }

  const escalaMes = [];
  const { ano, mes, dia } = date;

  const dataAtual = new Date(ano, mes, dia);

  for (let mm = mes; mm < 12; mm++) {
    const domingosMes = [];

    while (dataAtual.getMonth() === mm) {
      if (dataAtual.getDay() === 0) {
        domingosMes.push(new Date(dataAtual).toLocaleDateString("pt-BR"));
      }

      dataAtual.setDate(dataAtual.getDate() + 1);
    }

    const escala = [];

    dados.forEach((pessoa) => {
      const limite = pessoa.sexo === "Masculino" ? 3 : 2;
      let contador = pessoa.domingoAtual;

      const trabalha = [];
      const folga = [];

      domingosMes.forEach((domingo) => {
        if (contador <= limite) {
          trabalha.push(domingo);
          contador++;
        } else {
          folga.push(domingo);
          contador = 1;
        }
      });

      pessoa.domingoAtual = contador;
      escala.push({
        uid: pessoa.uid,
        trabalha,
        folga,
        horario: pessoa.horario,
      });
    });

    escalaMes.push({
      domingos: domingosMes,
      escala,
    });

    console.log("Gerando escalas...");
  }

  for (const data of escalaMes) {
    const domingos = data.domingos;
    const escala = data.escala;

    for (const d of domingos) {
      const docRef = doc(db, "escalas", d.replaceAll("/", "-"));

      try {
        await setDoc(docRef, {
          date: serverTimestamp(),
        });

        for (const e of escala) {
          const escalado = e.trabalha;
          const folga = e.folga;

          const docCol = doc(
            db,
            "escalas",
            d.replaceAll("/", "-"),
            "colaboradores",
            e.uid,
          );

          const folgando = doc(
            db,
            "escalas",
            d.replaceAll("/", "-"),
            "folgando",
            e.uid,
          );

          for (const c of escalado) {
            const verf = c.replaceAll("/", "-") === d.replaceAll("/", "-");

            if (verf) {
              try {
                await setDoc(docCol, {
                  horario: e.horario,
                  status: true,
                });
              } catch (error) {
                console.error(error);
              }
            }
          }

          for (const a of folga) {
            const verf = a.replaceAll("/", "-") === d.replaceAll("/", "-");
            if (verf) {
              try {
                await setDoc(folgando, {
                  status: "folgando",
                });
              } catch (error) {
                console.error(error);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
