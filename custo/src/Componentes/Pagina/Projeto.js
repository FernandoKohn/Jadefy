import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"
// import EditarProjeto from "../Layout/EditarProjeto"
// import { Link } from 'react-router-dom'
import VerProjeto from "./VerProjeto"


function Projeto() {

    const [mostrar1, setMostrar] = useState(false)
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)
    const [mensagem, setMensagem] = useState('')
    const [mensagemTipo, setMensagemTipo] = useState('')
    const [servico, setServico] = useState([])
    const [projeto, setProjeto] = useState([])
    const [servicoId, setServicoId] = useState()


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
        }, 700)
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

    function removerServico(ServicoId, custo) {
        var novoProjeto = projeto
        var Filtro = servico.filter((servico) => servico.id != ServicoId)
        novoProjeto.servicos = Filtro
        novoProjeto.custo = novoProjeto.custo - custo

        fetch(`http://localhost:5000/Projetos/${servicoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(novoProjeto)
        })
            .then(resp => resp.json())
            .then(data => {
                setProjeto(novoProjeto)
                window.location.reload();

            })
            .catch(err => console.log(err))
    }
  
    async function fetchServico(id) {
        await fetch(`http://localhost:5000/Projetos/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        .then(resp => resp.json())
        .then((data) => {
            setServico(data.servicos)
            setProjeto(data)
            setServicoId(id)
        })
        .catch(err => console.log(err))
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
                <div className={styles.projetoSection}>
                    <div className={styles.Header}>
                        <h1>Meus projetos</h1>
                        <button onClick={mostrarCriar} className={styles.btn}>Criar Projeto</button>
                    </div>
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
                    <div className={styles.Projetos}>
                        {projetos.length > 0 && projetos.map((projeto) => (
                            <div className={styles.ProjetoCard} key={projeto.id}>
                                <div className={styles.projetoHeader}>
                                    <h1>{projeto.nome}</h1>
                                    <div className={styles.Icones}>
                                    <i class='bx bx-show' onClick={() => fetchServico(projeto.id)}></i>
                                        <i className='bx bx-x' id={projeto.id} onClick={removerProjeto}></i>
                                    </div>
                                </div>
                                <p>Tipo:<span className={styles.Span1}>{projeto.tipo}</span></p>
                                <p>Orçamento: <span className={styles.Span2}>{projeto.orcamento}</span></p>
                                <p>Prazo de entrega: <span className={styles.Span3}>{projeto.prazo}</span></p>
                            </div>
                        )
                        )
                        }
                    </div>
                </div>
                <div className={styles.ServicosSection}>
                        <div className={styles.Header2}>
                            <h1>Serviços</h1>
                            <button className={styles.btn}>Criar Serviço</button>
                        </div>
                        <div className={styles.servicos}>
                        {servico.length > 0 && servico.map((servico) => (
                            <div className={styles.ServicoCard} key={servico.id} >
                                <h1>{servico.nome}</h1>
                                <p>{servico.custo}</p>
                                <p>{servico.descricao}</p>
                                <button onClick={() => { removerServico(servico.id, servico.custo) }}>Apagar Serviço</button>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Projeto