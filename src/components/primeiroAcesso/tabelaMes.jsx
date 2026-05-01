import { useState, useEffect } from 'react'
import { CircularProgress } from "@mui/material";

export default function TabelaMes({ dados }) {
    const [current, setCurrent] = useState(0)
    const [mesSelecionado, setMesSelecionado] = useState(0)

    const mesAtual = new Date().toLocaleDateString('pt-BR', { month: 'long' })

    const ordemMeses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];

    const mesesOrdenados = Object.entries(dados).sort(([mesA], [mesB]) => {
        const indexA = ordemMeses.indexOf(mesA);
        const indexB = ordemMeses.indexOf(mesB);
        return indexA - indexB;
    }).map(([mes, valor]) =>
    ({
        mes,
        ...valor
    }));

    useEffect(() => {
        const indexInicial = mesesOrdenados.findIndex(
            (m) => m.mes.toLowerCase() === mesAtual
        );

        if (indexInicial !== -1) {
            setCurrent(indexInicial);
        }
    }, [])

    const p = mesesOrdenados[current]
    const mes = String(p?.mes).charAt(0).toUpperCase() + String(p?.mes).slice(1)

    const list = p?.domingos?.map((domingo) => {
        const dom = domingo.toDate().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        })
        return dom
    })

    const trabalhando = Object.entries(p?.funcoes || {}).map(([funcao, lista]) => {
        return {
            funcao,
            pessoas: lista.filter((l) =>
                l.colab.trabalha?.some(
                    (c) => c === list[mesSelecionado]
                )
            ),
        };
    });

    console.log(trabalhando)


    if (!dados || !mesesOrdenados.length || !p) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress aria-label="Loading…" />;
            </div>
        );
    }

    return (
        <>  <div style={{ display: "flex", justifyContent: 'space-between' }}>

            <button onClick={() => setCurrent((prev) =>
                (prev - 1 + mesesOrdenados.length) % mesesOrdenados.length
            )}>voltar</button >
            <h1>{mes}</h1>
            <button onClick={() => setCurrent((prev) =>
                (prev + 1) % mesesOrdenados.length
            )}> proximo</button >
        </div>

            <div style={{ display: "flex", justifyContent: 'space-around' }}>
                {list?.map((domingo, i) => <p key={i} style={{ backgroundColor: i === mesSelecionado ? "red" : 'white' }} onClick={() => setMesSelecionado(() => i)}>{domingo}</p>)}
            </div>

            {
                trabalhando.map((e) => (
                    <>
                        <h1>

                            {e.funcao}
                        </h1>

                        {
                            e.pessoas.map((p) => (
                                <p>{p.colab.colaborador.colaborador
                                }</p>
                            ))
                        }
                    </>
                ))
            }
        </>
    )
}