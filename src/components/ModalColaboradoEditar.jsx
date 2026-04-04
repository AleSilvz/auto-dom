import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function ModalColaboradoEditar({ show, closeModal, colab }) {
  const [dados, setDados] = useState({});
  const sexo = ["Masculino", "Feminino"];
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

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

  useEffect(() => {
    setDados(colab);
  }, [colab]);

  async function enviarDados() {
    try {
      const docRef = doc(db, "colaboradores", dados?.ID);
      await updateDoc(docRef, dados);

      alert("Dados enviados!");
      limpar();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDados(e) {
    const { name, value } = e.target;

    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleHorario(e) {
    const { name, value } = e.target;

    console.log(e);
    setDados((prev) => ({
      ...prev,
      horario: {
        ...prev.horario,
        [name]: value,
      },
    }));
  }

  function calcularHoras(horario) {
    const toMin = (hora) => {
      if (!hora) return 0;
      const [h, m] = hora.split(":").map(Number) || "";
      return h * 60 + m;
    };

    const entrada = toMin(horario?.entrada);
    const saida = toMin(horario?.saida);
    const entradaInt = toMin(horario?.entradaIntervalo);
    const saidaInt = toMin(horario?.saidaIntervalo);

    const totalTrabalho = saida - entrada;
    const intervalo = saidaInt - entradaInt;

    const total = totalTrabalho - intervalo;

    const horas = Math.floor(total / 60);
    const minutos = total % 60;

    return horas ? `${horas}h ${minutos}min` : "min";
  }

  const resultado = calcularHoras({
    ...dados?.horario,
  });

  return (
    show && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!dados ? (
          <h2>Carregando...</h2>
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              width: "65%",
              height: "85%",
              border: "1px solid #f1f1f1",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                padding: 15,
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontWeight: "600" }}>Editar dados</h3>
              <span onClick={() => closeModal()} style={{ cursor: "pointer" }}>
                <IoMdClose size={20} />
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "0 15px",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", gap: 20 }}>
                <p>ID: {dados?.ID}</p>
                <div style={{ width: "60%" }}>
                  <h3
                    style={{
                      marginBottom: 5,
                      marginLeft: 10,
                      fontWeight: "normal",
                    }}
                  >
                    Colaborado
                  </h3>
                  <input
                    style={{
                      width: "100%",
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      fontSize: 20,
                      padding: "10px 15px",
                      borderRadius: 20,
                      outline: "none",
                      textTransform: "uppercase",
                    }}
                    type="text"
                    name="colaborador"
                    value={dados?.colaborador}
                    onChange={handleDados}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      marginBottom: 5,
                      marginLeft: 10,
                      fontWeight: "normal",
                    }}
                  >
                    Sexo
                  </h3>
                  <div style={{ display: "flex", gap: 10 }}>
                    {sexo.map((e, i) => (
                      <div
                        key={i}
                        name="sexo"
                        style={{
                          fontSize: 15,
                          padding: "10px 10px",
                          borderRadius: 20,
                          cursor: "pointer",
                          border: "1px solid #d4d4d4",
                          backgroundColor: dados?.sexo === e ? "#CBDBFC" : "",
                        }}
                        onClick={() =>
                          setDados((prev) => ({
                            ...prev,
                            sexo: e,
                          }))
                        }
                      >
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3
                  style={{
                    marginBottom: 5,
                    marginLeft: 10,
                    fontWeight: "normal",
                  }}
                >
                  Função
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 10,
                    justifyContent: "space-evenly",
                    overflowX: "auto",
                    padding: 10,
                  }}
                >
                  {funcao.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 15,
                        padding: "10px 10px",
                        borderRadius: 20,
                        cursor: "pointer",
                        border: "1px solid #d4d4d4",
                        backgroundColor: dados?.funcao === e ? "#CBDBFC" : "",
                      }}
                      onClick={() => {
                        setDados((prev) => ({
                          ...prev,
                          funcao: e,
                        }));
                      }}
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  style={{
                    marginBottom: 5,
                    marginLeft: 10,
                    fontWeight: "normal",
                  }}
                >
                  Folga Fixa
                </h3>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  {diasSemana.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 15,
                        padding: "10px 10px",
                        borderRadius: 20,
                        cursor: "pointer",
                        border: "1px solid #d4d4d4",
                        backgroundColor:
                          dados?.folgaFixa === e ? "#CBDBFC" : "",
                      }}
                      onClick={() => {
                        setDados((prev) => ({
                          ...prev,
                          folgaFixa: e,
                        }));
                      }}
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  style={{
                    marginBottom: 5,
                    marginLeft: 10,
                    fontWeight: "normal",
                  }}
                >
                  Horário
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <div>Entrada</div>
                    <input
                      type="time"
                      name="entrada"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                      }}
                      value={dados.horario?.entrada}
                      onChange={handleHorario}
                    />
                  </div>
                  <div>
                    <div>Entrada Intervalo</div>
                    <input
                      type="time"
                      name="entradaIntervalo"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                      }}
                      value={dados.horario?.entradaIntervalo}
                      onChange={handleHorario}
                    />
                  </div>
                  <div>
                    <div>Saída Intervalo</div>
                    <input
                      type="time"
                      name="saidaIntervalo"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                      }}
                      value={dados.horario?.saidaIntervalo}
                      onChange={handleHorario}
                    />
                  </div>
                  <div>
                    <div>Saída</div>
                    <input
                      type="time"
                      name="saida"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                      }}
                      value={dados.horario?.saida}
                      onChange={handleHorario}
                    />
                  </div>
                  <div>
                    <div>Total</div>
                    <div>{resultado ? resultado : ""}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                padding: 20,
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  border: "1px solid #e7e7e7",
                  fontSize: 15,
                  padding: "10px 20px",
                  borderRadius: 20,
                  cursor: "pointer",
                  backgroundColor: "#ffd9b6",
                }}
                onClick={() => {
                  closeModal();
                  setDados("");
                }}
              >
                Limpar
              </button>
              <button
                style={{
                  border: "1px solid #e7e7e7",
                  fontSize: 15,
                  padding: "10px 20px",
                  borderRadius: 20,
                  cursor: "pointer",
                  backgroundColor: "#137EE2",
                  color: "white",
                }}
                //   disabled={!camposPreenchidos(dados)}
                onClick={enviarDados}
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default ModalColaboradoEditar;
