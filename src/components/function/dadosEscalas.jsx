import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default async function dadosEscalas() {
    try {
        const ano = new Date().getFullYear()
        const docRef = collection(db, "escalas", String(ano), "meses");
        const dados = await getDocs(docRef);

        const d = dados.docs.reduce((acc, item) => {
            const j = item.data()
            if (!acc[j.mes]) {
                acc[j.mes] = {
                    funcoes: {},
                    domingos: j.domingos,
                    id: item.id
                }
            }

            j.colaboradores.forEach((colab, index) => {
                const funcao = colab.colaborador.funcao
                if (!acc[j.mes].funcoes[funcao]) {
                    acc[j.mes].funcoes[funcao] = [];
                }
                acc[j.mes].funcoes[funcao].push({ colab, index });
            })

            return acc
        }, {})

        return d
    } catch (error) {
        console.error(error);
    }
}