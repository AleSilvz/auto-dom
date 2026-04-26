import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default async function dadosColaboradores() {
  try {
    const docRef = collection(db, "colaboradores");
    const dados = await getDocs(docRef);

    return dados.docs.map((e) => e.data());
  } catch (error) {
    console.error(error);
  }
}
