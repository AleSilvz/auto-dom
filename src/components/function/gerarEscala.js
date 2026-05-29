import { db } from "../../firebaseConfig";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

export async function GerarEscala(date) {
  const [ano, mes, dia] = String(date).split("-").map(Number);
  const meses = [];

  const d = new Date(ano, mes - 1, dia);

  while (d.getMonth() === mes - 1) {
    if (d.getDay() === 0) {
      meses.push(new Date(d).toLocaleDateString("pt-BR"));
    }
    d.setDate(d.getDate() + 1);
  }

  try {
    for (const dados of meses) {
      const docRef = doc(db, "escalas", dados.replaceAll("/", "-"));
      await setDoc(docRef, {
        uid: "uid1",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
