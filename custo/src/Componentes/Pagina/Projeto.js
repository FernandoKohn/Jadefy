import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"
import EditarProjeto from "../Layout/EditarProjeto"
import { Link } from 'react-router-dom'


function Projeto() {

    const [mostrar1, setMostrar] = useState(false)
    const [mostrar2, setMostrar2] = useState(false)
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)

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
                setProjetos(data)
                setLoading(false)
            })
        }, 1500)
    })

    function mostrarCriar() {
        setMostrar(!mostrar1)
    }

    function mostrarEditar() {
        setMostrar2(!mostrar2)
    }

    function enviarProjeto(projeto) {

        projeto.servicos = []

        fetch("http://localhost:5000/Projetos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    }

    function removerProjeto(e) {
        let id = e.target.id
        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resp => resp.json())
            .then((data) => {
                setProjetos(projetos.filter((projeto) => projeto.id !== id))
            })
            .catch(err => console.log(err))
    }

    function editarProjeto(projeto, id) {
        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjetos(data)
            setMostrar2(!mostrar2)
        })
        .catch(err => console.log(err))
    }

    


    return (
        <div className={styles.Projeto}>
            <Navbar/>

            {mostrar1 && (
                <div className={styles.CriarProjeto}>
                    <CriarProjeto enviarProjeto={enviarProjeto} mudarEstado={mostrarCriar} />
                </div>
            )}

            <div className={styles.Conteudo}>
                <div className={styles.Header}>
                    <h1>Meus projetos</h1>
                    <button onClick={mostrarCriar} className={styles.btn}>Criar Projeto</button>
                </div>
                <div className={styles.Projetos}>
                    {loading && (
                        <div className={styles.Loading}>
                            <i></i>
                            <p>Carregando projetos</p>
                        </div>
                    )}
                    {projetos.length > 0 && projetos.map((projeto) => (
                        <div className={styles.ProjetoCard} key={projeto.id}>
                            <div className={styles.Icones}>
                                <i className='bx bx-x' id={projeto.id} onClick={removerProjeto}></i>
                                <i className='bx bxs-pencil' id={styles.Lapis} onClick={mostrarEditar}></i>
                            </div>
                            <h1>{projeto.nome}</h1>
                            <p>Tipo: {projeto.tipo}</p>
                            <p>Orçamento: {projeto.orcamento}</p>
                            <p>Prazo de entrega: {projeto.prazo}</p>
                            <Link to={'/Projeto/' + projeto.id}>
                                <button>Ver projeto</button>
                            </Link>
                            {mostrar2 && (  
                                <div className={styles.EditarProjeto}>
                                    <EditarProjeto
                                        mostrarEditar={mostrarEditar}
                                        editarProjeto={editarProjeto}
                                        id={projeto.id}
                                        nome={projeto.nome}
                                        tipo={projeto.tipo}
                                        orcamento={projeto.orcamento}
                                        prazo={projeto.prazo} />
                                </div>
                            )}
                        </div>
                    )
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Projeto