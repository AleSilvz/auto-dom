import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import TabelaColaboradores from "../components/TabelaColaboradores";
import ModalColaboradoEditar from "../components/ModalColaboradoEditar";
import ModalAdicionarColaborador from "../components/ModalAdicionarColaborador";

function Colaboradores() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAdicionar, setShowModalAdicionar] = useState(false);
  const [colab, setColab] = useState({});

  function abrirModal() {
    showModal ? setShowModal(false) : setShowModal(true);
  }

  function abrirModalAdicionar() {
    showModalAdicionar
      ? setShowModalAdicionar(false)
      : setShowModalAdicionar(true);
  }

  function colabSelect(colaborado) {
    setColab(colaborado);
  }

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        height: "100%",
        backgroundColor: "#F7F9FF",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          // backgroundColor: "gray",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Collaborators</h1>
          <p style={{ color: "gray" }}>
            Add collaborator, change schedules, modify fixed days off.
          </p>
        </div>
        <button
          style={{
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 25px 10px 20px ",
            gap: "5px",
            backgroundColor: "#137ee2",
            color: "white",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={abrirModalAdicionar}
        >
          <IoIosAdd size={25} /> Add collaborator
        </button>
      </div>

      <TabelaColaboradores
        funcModal={abrirModal}
        colabSelect={colabSelect}
      />
      <ModalColaboradoEditar
        show={showModal}
        closeModal={abrirModal}
        colab={colab}
      />
      <ModalAdicionarColaborador
        show={showModalAdicionar}
        funcModal={abrirModalAdicionar}
      />
    </div>
  );
}

export default Colaboradores;
