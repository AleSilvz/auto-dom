import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import RadialBarChartExample from "../components/graficos/RadialBarChartExample";

function Home() {
  const [currentSelect, setCurrentSelect] = useState("Todos");
  const [dadosFuncionarios, setDadosFuncionarios] = useState({
    resumo: [
      { title: "Total", total: 0 },
      { title: "Ativos", total: 0 },
      { title: "Em férias", total: 0 },
      { title: "Inativo", total: 0 },
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
        }
      });

      const total = snapshot.size;

      setDadosFuncionarios((prev) => ({
        ...prev,
        resumo: [
          { title: "Total", total: total },
          { title: "Ativos", total: ativos },
          { title: "Em férias", total: ferias },
          { title: "Inativo", total: total - ativos - ferias },
        ],
        semana: Object.entries(contagemSemana).map(([dia, total]) => ({
          title: dia,
          total,
        })),
        funcao: resultado,
        folgandoHoje: folgaHoje,
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

  console.log(dadosFuncionarios.folgandoHoje);

  const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  };

  const tdStyle = {
    padding: "12px 16px",
    fontSize: 14,
    color: "#333",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "20px",
        gap: 20,
        flexDirection: "column",
        overflowY: 'auto'
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <h1 style={{ fontWeight: "bold", color: "#2C333B" }}>Dashboard</h1>
          <p style={{ color: "gray" }}>
            Gerencie sua equipe, visualize departamentos e controle o status
            operacional de toda a equipe.
          </p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          borderBottom: "1px solid #dfdfdf",
          display: "flex",
          gap: "5%",
          padding: "10px 0",
        }}
      >
        {dadosFuncionarios?.resumo.map((e, i) => (
          <span key={i}>
            <h3 style={{ fontSize: 15, fontWeight: "400", color: "#808080" }}>
              {e.title}
            </h3>
            <p style={{ fontSize: 30, fontWeight: "500" }}>
              {String(e.total).padStart(2, "0")}
            </p>
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "5%" }}>
        <div style={{ width: "35%" }}>
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
                <XAxis dataKey="title" fontSize={15} style={{ padding: 15 }} />

                <Bar dataKey="total" fill="#3c7aff" >
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

      <div
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <p style={{ fontSize: 15, fontWeight: "400", color: "#808080" }}>
          Folgando hoje
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <thead style={{ backgroundColor: "#f5f5f5" }}>
            <tr>
              <th style={thStyle}>Colaborador</th>
              <th style={thStyle}>Função</th>
              <th style={thStyle}>Folga Fixa</th>
              <th style={thStyle}>Horário</th>
            </tr>
          </thead>

          <tbody>
            {dadosFuncionarios?.folgandoHoje.map((e, i) => (
              <tr
                key={i}
                style={{
                  borderTop: "1px solid #eee",
                  transition: "0.2s",
                }}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.background = "#fafafa")
                }
                onMouseLeave={(ev) =>
                  (ev.currentTarget.style.background = "transparent")
                }
              >
                <td style={tdStyle}>{e.colaborador}</td>
                <td style={tdStyle}>{e.funcao}</td>
                <td style={tdStyle}>{e.folgaFixa}</td>
                <td style={tdStyle}>{e.horario.entrada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
