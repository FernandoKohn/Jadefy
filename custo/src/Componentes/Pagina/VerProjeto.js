import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import styles from "./VerProjeto.module.css"
import { useParams } from "react-router-dom"
import CriarServico from "../Layout/CriarServico"
import { v4 as uuidv4 } from 'uuid';
import EditarProjeto from "../Layout/EditarProjeto"



function VerProjeto() {
    const [projeto, setProjeto] = useState([])
    const [servico, setServico] = useState([])
    const [mostrar, setMostrar] = useState(false)
    const [mostrar2, setMostrar2] = useState(false)
    var { id } = useParams()


    


    useEffect(() => {
        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setProjeto(data)
                setServico(data.servicos)
            })
            .catch(err => console.log(err))
    }, [id])

    function EnviarServico(novoProjeto) {
        var ultimoservico = novoProjeto.servicos[novoProjeto.servicos.length - 1]
        ultimoservico.id = uuidv4()
        var custoServico = parseFloat(ultimoservico.custo)
        var projetoOrcamento = parseFloat(projeto.orcamento)
        var novoCusto = parseFloat(novoProjeto.custo) + custoServico

        if (custoServico > projetoOrcamento || novoCusto > projetoOrcamento) {
            window.alert("O custo do seu serviço ultrapassa o orçamento")
            novoProjeto.servicos.pop()
            return false
        }

        novoProjeto.custo = novoCusto

        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProjeto)
        })
            .then(resp => resp.json())
            .then((data) => {
                setMostrar(false)
                setServico(data.servicos)
            })
            .catch(err => console.log(err))
    }

    function removerServico(servicoId, custo) {
        var novoProjeto = projeto
        var Filtro = servico.filter((servico) => servico.id != servicoId)
        novoProjeto.servicos = Filtro
        novoProjeto.custo = novoProjeto.custo - custo

        fetch(`http://localhost:5000/Projetos/${id}`, {
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

    function ToggleMostrar() {
        setMostrar(!mostrar)
    }

    function ToggleMostrar2() {
        setMostrar2(!mostrar2)
    }
    
    function editarProjeto(projeto) {
        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
            .then(resp => resp.json())
            .then((data) => {
                setProjeto(data)
            })
            .catch(err => console.log(err))
    }



    return (
        <div className={styles.VerProjeto}>
            <Navbar />
            {mostrar && (
                <div className={styles.CriarServico}>
                    <CriarServico setMostrar={ToggleMostrar} EnviarServico={EnviarServico} Projeto={projeto} />
                </div>
            )}
            {mostrar2 && (
                <div className={styles.EditarProjeto}>
                    <EditarProjeto
                        mostrarEditar={ToggleMostrar2}
                        editarProjeto={editarProjeto}
                        id={projeto.id}
                        nome={projeto.nome}
                        tipo={projeto.tipo}
                        orcamento={projeto.orcamento}
                        prazo={projeto.prazo} />
                </div>
            )}
            <div className={styles.Conteudo}>
                <div className={styles.Header}>
                    <h1>{projeto.nome}</h1>
                    <div className={styles.btn}>
                        <button className={styles.btnFilho} onClick={ToggleMostrar}>Criar Serviço</button>
                        <button className={styles.btnFilho} onClick={ToggleMostrar2}>Editar Projeto</button>
                    </div>
                </div>
                <div className={styles.ProjetoInfo}>
                    <p>{projeto.tipo}</p>
                    <p>{projeto.orcamento}</p>
                    <p>orçamento total*</p>
                    <p>{projeto.prazo}</p>
                </div>
                <div className={styles.Servicos}>
                    <h1>Serviços</h1>
                    <div className={styles.ServicosDiv}>
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

export default VerProjeto