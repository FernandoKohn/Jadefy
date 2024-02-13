import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"
// import EditarProjeto from "../Layout/EditarProjeto"
// import { Link } from 'react-router-dom'
import CriarServico from "../Layout/CriarServico"
import { v4 as uuidv4 } from 'uuid';


function Projeto() {

    const [mostrar1, setMostrar] = useState(false) // Toggle criar projeto
    const [mostrar2, setMostrar2] = useState(false) // Toggle criar serviço
    const [projetos, setProjetos] = useState([]) // Todos os projetos
    const [projetoServico, setprojetoServico] = useState([]) // Projeto do serviço escolhido
    const [projetoServicoId, setprojetoServicoId] = useState() // Id do projeto do serviço escolhido 
    const [servicos, setServicos] = useState([]) // Serviços do projeto escolhido
    const [loading, setLoading] = useState(true) // Loading
    const [mensagem, setMensagem] = useState('') // Mensagem de erro ou sucesso
    const [mensagemTipo, setMensagemTipo] = useState('') // Tipo da mensagem



    // Pega todos os projetos
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

    // Envia o projeto após criar ele
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

    // Remove o projeto selecionado
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

    //Pega os serviços do projeto selecionado
    function fetchServicos(e) {
        setprojetoServicoId(e.target.id)
        fetch(`http://localhost:5000/Projetos/${e.target.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setServicos(data.servicos)
                setprojetoServico(data)
            })
            .catch(err => console.log(err))
    }

    //Envia serviços criados
    function EnviarServico(novoProjeto) {
        var ultimoservico = novoProjeto.servicos[novoProjeto.servicos.length - 1]
        ultimoservico.id = uuidv4()
        var custoServico = parseFloat(ultimoservico.custo)
        var projetoOrcamento = parseFloat(projetoServico.orcamento)
        var novoCusto = parseFloat(novoProjeto.custo) + custoServico
        var dataInicial = new Date()
        var dataFormatada = dataInicial.toLocaleDateString()
        var dataFormatada2 = new Date(`${novoProjeto.servicos[novoProjeto.servicos.length -1].prazo}`)
        var dataFinal = dataFormatada2.toLocaleDateString()
        novoProjeto.servicos[novoProjeto.servicos.length -1].criado = dataFormatada
        novoProjeto.servicos[novoProjeto.servicos.length -1].prazo = dataFinal


        if (custoServico > projetoOrcamento || novoCusto > projetoOrcamento) {
            window.alert("O custo do seu serviço ultrapassa o orçamento")
            novoProjeto.servicos.pop()
            return false
        }

        novoProjeto.custo = novoCusto

        fetch(`http://localhost:5000/Projetos/${projetoServicoId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProjeto)
        })
            .then(resp => resp.json())
            .then((data) => {
                setMostrar(false)
                setServicos(data.servicos)
            })
            .catch(err => console.log(err))
    }

    // Remove serviços existentes
    function removerServico(servicoId, custo) {
        var novoProjeto = projetoServico
        var Filtro = servicos.filter((servico) => servico.id != servicoId)
        novoProjeto.servicos = Filtro
        novoProjeto.custo = novoProjeto.custo - custo

        fetch(`http://localhost:5000/Projetos/${projetoServicoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(novoProjeto)
        })
            .then(resp => resp.json())
            .then(data => {
                setprojetoServico(novoProjeto)
                setServicos(data.servicos)

            })
            .catch(err => console.log(err))
    }

    function refreshpage() {
        window.location.reload()
    }

    function mostrarCriar() {
        setMostrar(!mostrar1)
    }

    function mostrarCriar2() {
        setMostrar2(!mostrar2)
    }



    return (
        <div className={styles.Projeto}>
            <Navbar />
            {mostrar1 && (
                <div className={styles.CriarProjeto}>
                    <CriarProjeto enviarProjeto={enviarProjeto} mudarEstado={mostrarCriar} />
                </div>
            )}
            {mostrar2 && (
                <div className={styles.CriarServico}>
                    <CriarServico setMostrar={mostrarCriar2} EnviarServico={EnviarServico} Projeto={projetoServico} />
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
                                        <i class='bx bx-search-alt-2' id={projeto.id} onClick={fetchServicos}></i>
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
                        {projetoServicoId && (
                            <button className={styles.btn} onClick={mostrarCriar2}>Criar Serviço</button>
                        )}
                    </div>
                    <div className={styles.Servicos}>
                        {servicos.length > 0 && servicos.map((servico) => (
                            <div className={styles.ServicoCard} key={servico.id} >
                                <h1>{servico.nome}</h1>
                                <p>Custo do serviço: {servico.custo}</p>
                                <p>Descrição: {servico.descricao}</p>
                                <p>{servico.criado} - {servico.prazo}</p>
                                <i className='bx bx-x' onClick={() => removerServico(servico.id, servico.custo)}></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projeto