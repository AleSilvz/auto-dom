function TabelaEscalasDomingos() {
  const arr = [
    {
      name: "alessandro",
      funcao: "Fiscal",
    },
    {
        name: "Fatima",
        funcao: 'Padaria'
    },
    {
        name: "Gael",
        funcao: 'Gerente'
    },
  ];

  return (
    <div>
      <h2>Escala 00/00/0000</h2>
      <button>Criar escalas</button>

      {arr.map((e) => (
        <>
        <div>{e.funcao}</div>
        <table>
            <thead><tr><th>Name</th></tr></thead>
            <tbody><tr><td>{e.name}</td></tr></tbody>
        </table>
        </>
      ))}
    </div>
  );
}

export default TabelaEscalasDomingos;
