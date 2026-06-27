import { useState, useRef, useEffect } from "react";
import { cors } from "../global/cors";

export default function DragDiv({ fechar, funcao }) {
  const [pos, setPos] = useState({ x: 100, y: 100 });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  function handleMouseDown(e) {
    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  }

  useEffect(() => {
    function handleMouseMove(e) {
      if (!dragging.current) return;

      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }

    function handleMouseUp() {
      dragging.current = false;
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const folgando = funcao.f[funcao.funcao] || [];
  const trablhando = funcao.t[funcao.funcao] || [];

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        background: "#ffffff",
        position: "absolute",
        left: pos.x,
        top: pos.y,
        cursor: "grab",
        zIndex: 20,
        userSelect: "none",
        backgroundColor: cors.white,
        border: `1px solid ${cors.border}`,
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h2>{funcao.funcao}</h2>
        <button onClick={() => fechar(funcao.id)}>Fechar</button>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <table
          style={{
            width: "100%",
          }}
        >
          <tbody>
            {trablhando.map((e, i) => (
              <tr key={i}>
                <td>{e.colaborador}</td>
                <td>{e.horario.entrada}</td>
                <td>{e.folgaFixa}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
          }}
        >
          <tbody>
            {folgando.map((e, i) => (
              <tr key={i}>
                <td>{e.colaborador}</td>
                <td>{e.horario.entrada}</td>
                <td>{e.folgaFixa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
