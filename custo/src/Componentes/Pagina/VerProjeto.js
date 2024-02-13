import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import styles from "./VerProjeto.module.css"
import { useParams } from "react-router-dom"
import CriarServico from "../Layout/CriarServico"
import { v4 as uuidv4 } from 'uuid';
import EditarProjeto from "../Layout/EditarProjeto"



function VerProjeto(ProjetoId) {
    const [projeto, setProjeto] = useState([])
    const [servico, setServico] = useState([])
    const [mostrar, setMostrar] = useState(false)
    const [mostrar2, setMostrar2] = useState(false)



    useEffect(() => {
        fetch(`http://localhost:5000/Projetos/`, {
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
    }, [ProjetoId])


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

        fetch(`http://localhost:5000/Projetos/${ProjetoId}`, {
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

        fetch(`http://localhost:5000/Projetos/${ProjetoId}`, {
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


    function editarProjeto(projeto) {
        fetch(`http://localhost:5000/Projetos/${ProjetoId}`, {
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
        <>
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
        </>
    )
}

export default VerProjeto