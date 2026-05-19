import { useState, useRef } from "react";

export default function DragDiv() {
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

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: 120,
          height: 120,
          background: "#007bff",
          position: "absolute",
          left: pos.x,
          top: pos.y,
          cursor: "grab",
          borderRadius: 10,
        }}
      />
    </div>
  );
}