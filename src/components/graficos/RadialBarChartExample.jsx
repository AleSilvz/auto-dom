import { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RadialBarChartExample() {
  const [ativo, setAtivo] = useState(null);

  const data = [
    { name: "a", vendas: 400, fill: "#8884d8" },
    { name: "b", vendas: 300, fill: "#83a6ed" },
    { name: "c", vendas: 500, fill: "#8dd1e1" },
    { name: "d", vendas: 500, fill: "#82ca9d" },
    { name: "r", vendas: 500, fill: "#a4de6c" },
    { name: "f", vendas: 55, fill: "#d0ed57" },
    { name: "g", vendas: 500, fill: "#ffc658" },
  ];

  return (
    <div style={{ height: 150, width: '50%' }} >
      <ResponsiveContainer style={{ outline: "none" }}>
        <RadialBarChart
          data={data.map((item) => ({
            ...item,
            fill: ativo === null || ativo === item.name ? item.fill : "#ccc",
          }))}
          innerRadius="20%"
          outerRadius="100%"
        >
          <RadialBar
            dataKey="vendas"
            cornerRadius={10}
            onClick={(data) => setAtivo(data.name)}
            isAnimationActive={true}
          />

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconSize={10}
            width={120}
            height={140}
            onClick={(e) =>
              setAtivo((prev) => (prev === e.value ? null : e.value))
            }
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
