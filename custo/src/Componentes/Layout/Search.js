import { useEffect, useState } from "react"
import styles from "./Search.module.css"

function Search({fetchServicos, setNome, removerProjeto}) {
    const [search, setSearch] = useState([])
    const [querySearch, setQuerySearch] = useState('')
    const [projeto, setProjeto] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/Projetos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProjeto(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    })

    const handleChange = (e) => {
        const query = e.target.value
        setQuerySearch(query)
        const resultado = projeto.filter((res) =>
            res.nome.includes(query)
        )
        setSearch(resultado)
        console.log(search)
    }

    const removerProjetoSearch = (id) => {
        const filtro = projeto.filter((projeto) => 
            !projeto.id.includes(id)
        )
        setSearch(filtro)
        console.log(search)
        console.log("minha wifu é maravilhosa <3")
    }

    return (
        <div className={styles.search}>
            <input type="Text" value={querySearch} onChange={handleChange} placeholder='Procurar projetos' />
            {search.length > 0 && search.map((projeto) => (
                <div className={styles.ProjetoCard} key={projeto.id}>
                    <div className={styles.projetoHeader}>
                        <h1>{projeto.nome}</h1>
                        <div className={styles.Icones}>
                            <button className={styles.btnProjeto} onClick={fetchServicos} id={projeto.id} onMouseDown={() => setNome(projeto.nome)}>Selecionar</button>
                            <i className='bx bx-x' id={projeto.id} onMouseDown={removerProjetoSearch} onClick={removerProjeto}></i>
                        </div>
                    </div>
                    <p>Tipo:<span className={styles.Span1}>{projeto.tipo}</span></p>
                    <p>Orçamento: <span className={styles.Span2}>{projeto.orcamento}</span></p>
                    <p>Prazo de entrega: <span className={styles.Span3}>{projeto.prazo}</span></p>
                </div>
            ))
            }
        </div>
    )
}

export default Search