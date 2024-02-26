import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import CriarProjeto from "../Layout/CriarProjeto"
import CriarServico from "../Layout/CriarServico"
import { useEffect, useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Animated } from "react-animated-css";



function Projeto() {

    const [mostrar1, setMostrar] = useState(false) // Toggle criar projeto
    const [mostrar2, setMostrar2] = useState(false) // Toggle criar serviço

    const [projetos, setProjetos] = useState([]) // Todos os projetos
    const [projetoServico, setprojetoServico] = useState([]) // Projeto do serviço escolhido
    const [projetoServicoId, setprojetoServicoId] = useState() // Id do projeto do serviço escolhido 
    const [projetoNome, setProjetoNome] = useState("")

    const [servicos, setServicos] = useState([]) // Serviços do projeto escolhido

    const [loading, setLoading] = useState(true) // Loading
    const [mensagem, setMensagem] = useState('') // Mensagem de erro ou sucesso
    const [mensagemTipo, setMensagemTipo] = useState('') // Tipo da mensagem
    const [projetoEstilo, setprojetoEstilo] = useState('Projeto') // Estilo dinamico da div principal

    const [querySearch, setQuerySearch] = useState('') // Conteudo pesquisado no search de projetos
    const [search, setSearch] = useState([]) // Obj com o resultado

    const [querySearch2, setQuerySearch2] = useState('') // Conteudo pesquisado no search de serviços
    const [search2, setSearch2] = useState([]) // Obj com o resultado

    const topo = useRef()


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
                setServicos([])
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

        // Adiciona id ao ultimo serviço
        var ultimoservico = novoProjeto.servicos[novoProjeto.servicos.length - 1]
        ultimoservico.id = uuidv4()
        var custoServico = parseFloat(ultimoservico.custo)
        var projetoOrcamento = parseFloat(projetoServico.orcamento)
        var novoCusto = parseFloat(novoProjeto.custo) + custoServico

        // Faz a relação da data criada e prazo
        var dataInicial = new Date()
        var dataFormatada = dataInicial.toLocaleDateString()
        var dataFormatada2 = new Date(`${novoProjeto.servicos[novoProjeto.servicos.length - 1].prazo}`)
        var dataFinal = dataFormatada2.toLocaleDateString()
        novoProjeto.servicos[novoProjeto.servicos.length - 1].criado = dataFormatada
        novoProjeto.servicos[novoProjeto.servicos.length - 1].prazo = dataFinal

        // Checa budget do projeto
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
                setMostrar2(false)
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

    function setNome(nome) {
        setProjetoNome(nome)
    }

    function setEstilo() {
        topo.current.scrollIntoView()
        setprojetoEstilo("ProjetoScrollLock")
    }

    function setEstilo2() {
        setprojetoEstilo("Projeto")
    }

    const handleSearch = (e) => {
        const query = e.target.value
        setQuerySearch(query)
        const resultado = projetos.filter((res) =>
            res.nome.includes(query)
        )
        setSearch(resultado)
    }

    const handleSearch2 = (e) => {
        const query2 = e.target.value
        setQuerySearch2(query2)
        const resultado2 = servicos.filter((res) =>
            res.nome.includes(query2)
        )
        setSearch2(resultado2)
    }

    function removerSearch2(id) {
        var Id = id
        const filtro = search2.filter((servico) => 
            !servico.id.includes(id)
        )
        setSearch2(filtro)
    }



    return (
        <div className={`${styles[projetoEstilo]}`} >

            <div ref={topo} className={styles.topo}></div>
            <Navbar />
            {mostrar1 && (
                <div className={styles.CriarProjeto}>
                    <CriarProjeto enviarProjeto={enviarProjeto} mudarEstado={mostrarCriar} setEstilo2={setEstilo2} />
                </div>
            )}
            {mostrar2 && (
                <div className={styles.CriarServico}>
                    <CriarServico setMostrar={mostrarCriar2} EnviarServico={EnviarServico} Projeto={projetoServico} setEstilo2={setEstilo2} />
                </div>
            )}
            <div className={styles.Conteudo}>
                <Animated className={styles.projetoSection} animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                    <div className={styles.Header} >
                        <div>
                            <h1  >Meus projetos</h1>
                            <button onClick={() => { mostrarCriar(); setEstilo() }} className={styles.btn}>Criar Projeto</button>
                        </div>
                        <input type="Text" value={querySearch} onChange={handleSearch} placeholder='Procurar projetos 🔍' className={styles.searchbar}/>
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
                        {search.length > 0 ? (
                            search.toReversed().map((projeto) => (
                                <div className={styles.ProjetoCard} key={projeto.id}>
                                    <div className={styles.projetoHeader}>
                                        <h1>{projeto.nome}</h1>
                                        <div className={styles.Icones}>
                                            <button className={styles.btnProjeto} onClick={fetchServicos} id={projeto.id} onMouseDown={() => setNome(projeto.nome)}>Selecionar</button>
                                            <i className='bx bx-x' id={projeto.id} onClick={(e) => {removerProjeto(e);refreshpage()}}></i>
                                        </div>
                                    </div>
                                    <p>Tipo:<span className={styles.Span1}>{projeto.tipo}</span></p>
                                    <p>Orçamento: <span className={styles.Span2}>{projeto.orcamento}</span></p>
                                    <p>Prazo de entrega: <span className={styles.Span3}>{projeto.prazo}</span></p>
                                </div>
                            )
                            )
                        ) : (
                            projetos.toReversed().map((projeto) => (
                                <div className={styles.ProjetoCard} key={projeto.id}>
                                    <div className={styles.projetoHeader}>
                                        <h1>{projeto.nome}</h1>
                                        <div className={styles.Icones}>
                                            <button className={styles.btnProjeto} onClick={fetchServicos} id={projeto.id} onMouseDown={() => setNome(projeto.nome)}>Selecionar</button>
                                            <i className='bx bx-x' id={projeto.id} onClick={removerProjeto}></i>
                                        </div>
                                    </div>
                                    <p>Tipo:<span className={styles.Span1}>{projeto.tipo}</span></p>
                                    <p>Orçamento: <span className={styles.Span2}>{projeto.orcamento}</span></p>
                                    <p>Prazo de entrega: <span className={styles.Span3}>{projeto.prazo}</span></p>
                                </div>
                            )
                            )
                        )}

                    </div>

                </Animated>
                <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true} className={styles.ServicosSection}>

                    <div className={styles.Header2}>
                        <div className={styles.header2Div1}>
                            <div>
                                <h1>Serviços</h1>
                                {projetoNome !== "" && (
                                    <p>Projeto Selecionado: {projetoNome}</p>
                                )}
                            </div>
                            {projetoServicoId ? <button className={styles.btn} onClick={() => { mostrarCriar2(); setEstilo() }}>Criar Serviço</button> : <span>Selecione projeto para ver serviços</span>}
                        </div>
                        <input type="Text" value={querySearch2} onChange={handleSearch2} placeholder='Procurar Serviços 🔍' className={styles.searchbar}/> 
                    </div>
                    <div className={styles.Servicos}>
                        {search2.length > 0 ? (
                            search2.toReversed().map((servico) => (
                                <div className={styles.ServicoCard} key={servico.id} >
                                    <h1>{servico.nome}</h1>
                                    <p>Custo do serviço: {servico.custo}</p>
                                    <p>Descrição: {servico.descricao}</p>
                                    <p>{servico.criado} - {servico.prazo}</p>
                                    <i className='bx bx-x' onClick={() => {removerServico(servico.id, servico.custo);removerSearch2(servico.id)}}></i>
                                </div>
                            ))
                        ) : (
                            servicos.map((servico) => (
                                <div className={styles.ServicoCard} key={servico.id} >
                                    <h1>{servico.nome}</h1>
                                    <p>Custo do serviço: {servico.custo}</p>
                                    <p>Descrição: {servico.descricao}</p>
                                    <p>{servico.criado} - {servico.prazo}</p>
                                    <i className='bx bx-x' onClick={() => {removerServico(servico.id, servico.custo)}}></i>
                                </div>
                            ))
                        )}
                    </div>

                </Animated>
            </div>
        </div>
    )
}

export default Projeto