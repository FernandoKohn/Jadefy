import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"
import EditarProjeto from "../Layout/EditarProjeto"
import { Link } from 'react-router-dom'


function Projeto() {

    const [mostrar1, setMostrar] = useState(false)
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)
    const [mensagem, setMensagem] = useState('')
    const [mensagemTipo, setMensagemTipo] = useState('')

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
                .catch((err) => {
                    setMensagem("Não foi possível carregar os projetos.")
                    setMensagemTipo('error')
                    setLoading(false)
                })
        }, 500)
    })

    function mostrarCriar() {
        setMostrar(!mostrar1)
    }

    function enviarProjeto(projeto) {

        projeto.servicos = []
        projeto.custo = 0

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

    function refreshpage() {
        window.location.reload()
    }

    return (
        <div className={styles.Projeto}>
            <Navbar />

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
                            <p>Carregando projetos</p>
                            <i class='bx bx-loader-circle bx-tada' ></i>
                        </div>
                    )}
                    {mensagemTipo == 'error' && (
                            <div className={styles.ErrorDiv}>
                                <p className={styles[mensagemTipo]}>{mensagem}</p>
                                <i class='bx bx-revision' onClick={refreshpage}></i>
                            </div>
                        )}
                    {projetos.length > 0 && projetos.map((projeto) => (
                        <div className={styles.ProjetoCard} key={projeto.id}>
                            <div className={styles.Icones}>
                                <i className='bx bx-x' id={projeto.id} onClick={removerProjeto}></i>
                            </div>
                            <h1>{projeto.nome}</h1>
                            <p>Tipo: {projeto.tipo}</p>
                            <p>Orçamento: {projeto.orcamento}</p>
                            <p>Prazo de entrega: {projeto.prazo}</p>
                            <Link to={'/Projeto/' + projeto.id}>
                                <button>Ver projeto</button>
                            </Link>

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