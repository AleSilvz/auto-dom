import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList } from "recharts";
import TabelaTrabalhando from "../components/tabelaTabalhando";
import TimelineDemo from "../components/TimelineDemo";

function Home() {
  const [currentSelect, setCurrentSelect] = useState("Todos");
  const [dadosFuncionarios, setDadosFuncionarios] = useState({
    resumo: [
      { title: "Total", total: 0 },
      { title: "Ativos", total: 0 },
      { title: "Em férias", total: 0 },
      { title: "Folgando hoje", total: 0 },
      { title: "Trabalhando hoje", total: 0 },
    ],
    semana: [
      { title: "Dom", total: 0 },
      { title: "Seg", total: 0 },
      { title: "Ter", total: 0 },
      { title: "Qua", total: 0 },
      { title: "Qui", total: 0 },
      { title: "Sex", total: 0 },
      { title: "Sab", total: 0 },
    ],
    funcao: {
      Fiscal: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Operador: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Selfiecheckout: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Repositor: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Hortifrut: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Padaria: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Açougue: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Prevenção: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Ecommerce: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Limpeza: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
      Noturno: [
        { title: "Dom", total: 0 },
        { title: "Seg", total: 0 },
        { title: "Ter", total: 0 },
        { title: "Qua", total: 0 },
        { title: "Qui", total: 0 },
        { title: "Sex", total: 0 },
        { title: "Sab", total: 0 },
      ],
    },
    folgandoHoje: [],
    trabalhandoHoje: [],
  });

  const mapaDias = {
    Domingo: "Dom",
    "Segunda-feira": "Seg",
    "Terça-feira": "Ter",
    "Quarta-feira": "Qua",
    "Quinta-feira": "Qui",
    "Sexta-feira": "Sex",
    Sábado: "Sab",
  };

  const funcaoF = [
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

  async function pegarDadosFirebaseFuncionarios() {
    try {
      const docRef = collection(db, "colaboradores");
      const snapshot = await getDocs(docRef);
      const resultado = {};
      const folgaHoje = [];
      const trabalhandoHoje = [];
      const date = new Date();
      const hoje = date.toLocaleDateString("pt-BR", { weekday: "short" });

      let ativos = 0;
      let ferias = 0;

      const contagemSemana = {
        Dom: 0,
        Seg: 0,
        Ter: 0,
        Qua: 0,
        Qui: 0,
        Sex: 0,
        Sab: 0,
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        const funcao = data.funcao;
        const diaCurto = mapaDias[data.folgaFixa];

        if (data.ativo) ativos++;
        if (data.status === "Férias") ferias++;

        if (data.folgaFixa) {
          if (diaCurto) {
            contagemSemana[diaCurto]++;
          }
        }

        if (funcao && diaCurto) {
          if (!resultado[funcao]) {
            resultado[funcao] = [
              { title: "Dom", total: 0 },
              { title: "Seg", total: 0 },
              { title: "Ter", total: 0 },
              { title: "Qua", total: 0 },
              { title: "Qui", total: 0 },
              { title: "Sex", total: 0 },
              { title: "Sab", total: 0 },
            ];
          }

          const diaObj = resultado[funcao].find((d) => d.title === diaCurto);

          if (diaObj) {
            diaObj.total++;
          }
        }

        if (
          hoje.replace(".", "").toLocaleLowerCase() ===
          String(diaCurto).toLocaleLowerCase()
        ) {
          folgaHoje.push(data);
        } else {
          trabalhandoHoje.push(data);
        }
      });

      const total = snapshot.size;

      setDadosFuncionarios((prev) => ({
        ...prev,
        resumo: [
          { title: "Total", total: total },
          { title: "Ativos", total: ativos },
          { title: "Em férias", total: ferias },
          { title: "Folgando hoje", total: folgaHoje.length },
          { title: "Trabalhando hoje", total: trabalhandoHoje.length },
        ],
        semana: Object.entries(contagemSemana).map(([dia, total]) => ({
          title: dia,
          total,
        })),
        funcao: resultado,
        folgandoHoje: folgaHoje,
        trabalhandoHoje: trabalhandoHoje,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    pegarDadosFirebaseFuncionarios();
  }, []);

  const consulta = currentSelect === "Todos";
  const filtroFuncao = dadosFuncionarios.funcao[currentSelect];
  const resultado = consulta ? dadosFuncionarios.semana : filtroFuncao;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "#292929",
          display: "flex",
          width: "100%",
          justifyContent: "right",
          padding: "5px 20px",
          // borderBottom: "1px solid #f1f1f1",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "5%",
          }}
        >
          {dadosFuncionarios?.resumo.map((e, i) => (
            <span key={i}>
              <h3 style={{ fontSize: 14, fontWeight: "300", color: "#808080" }}>
                {e.title}
              </h3>
              <p style={{ fontSize: 25, fontWeight: "500", marginTop: -8 }}>
                {String(e.total).padStart(2, "0")}
              </p>
            </span>
          ))}
        </div>
        <h2>Dashboard</h2>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          overflowY: "auto",
          alignItems: "center",
        }}
      >

        <TimelineDemo d={dadosFuncionarios} />


        <div style={{ display: "flex", gap: "5%", width: "100%" }}>
          <div style={{ width: "100%", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: 15, fontWeight: "400", color: "#808080" }}>
                Folgando na Semana
              </p>

              <select
                style={{ padding: 5, userSelect: "none", outline: "none" }}
                onClick={(e) => setCurrentSelect(e.target.value)}
              >
                <option value="Todos">Todos</option>
                {funcaoF.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={resultado} margin={{ top: 20 }}>
                  <XAxis
                    dataKey="title"
                    fontSize={15}
                    style={{ padding: 15 }}
                  />

                  <Bar dataKey="total" fill="#000000">
                    <LabelList
                      dataKey="total"
                      position="top"
                      style={{ fontSize: 12 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* <div style={{ gap: 20, display: "flex", flexDirection: "column" }}>
          <TabelaTrabalhando
            data={dadosFuncionarios?.folgandoHoje}
            title={"Folgando hoje"}
          />
          <TabelaTrabalhando
            data={dadosFuncionarios?.trabalhandoHoje}
            title={"Trabalhando hoje"}
          />
        </div> */}

      </div>
    </div>
  );
}

export default Home;
