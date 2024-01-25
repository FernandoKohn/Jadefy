import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"
import EditarProjeto from "../Layout/EditarProjeto"


function Projeto() {

    const [mostrar1, setMostrar] = useState(false)
    const [mostrar2, setMostrar2] = useState(false)
    const [projetos, setProjetos] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/Projetos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then((data) => {
                setProjetos(data)
            })
    })


    function mostrarCriar() {
        setMostrar(!mostrar1)
    }

    function mostrarEditar() {
        setMostrar2(!mostrar2)
    }

    function enviarProjeto(projeto) {
        fetch("http://localhost:5000/Projetos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
            .then(res => res.json())
            .then(data => console.log(data))
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
    }



    return (
        <div className={styles.Projeto}>
            <Navbar></Navbar>

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
                    {projetos.length > 0 && projetos.map((projeto) => (
                        <div className={styles.ProjetoCard} key={projeto.id}>
                            <h1>{projeto.nome}</h1>
                            <p>Tipo: {projeto.tipo}</p>
                            <p>Orçamento: {projeto.orcamento}</p>
                            <p>Prazo de entrega: {projeto.prazo}</p>
                            <button id={projeto.id} onClick={removerProjeto}>Apagar</button>
                            <button onClick={mostrarEditar}>Alterar</button>
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