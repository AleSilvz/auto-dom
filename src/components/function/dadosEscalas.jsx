import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import dadosColaboradores from "./dadosColaboradores";

export default async function dadosEscalas() {
  try {
      const colaboradores = await dadosColaboradores();

    const mapaColaboradores = Object.fromEntries(
      colaboradores.map((c) => [c.uid, c.col]),
    );

    const docRef = collection(db, "escalas");
    const dados = await getDocs(docRef);

    const resultado = [];

    for (const docSnap of dados.docs) {
      const uid = docSnap.id;

      const docCol = collection(db, "escalas", uid, "colaboradores");
      const docF = collection(db, "escalas", uid, "folgando");

      const [colaboradoresEscala, colaboradoresFolga] = await Promise.all([
        getDocs(docCol),
        getDocs(docF),
      ]);

      const data = colaboradoresEscala.docs.map((d) => ({
        uid: d.id,
        colaborador: mapaColaboradores[d.id],
      }));

      const folga = colaboradoresFolga.docs.map((d) => ({
        uid: d.id,
        colaborador: mapaColaboradores[d.id],
      }));

      resultado.push({
        uid,
        data,
        folga,
      });
    }

    console.log("Escalas carregadas...");
    return resultado;
  } catch (error) {
    console.error(error);
    return [];
  }
}
