import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import styles from "./VerProjeto.module.css"
import { useParams } from "react-router-dom"
import CriarServico from "../Layout/CriarServico"



function VerProjeto() {
    const [projeto, setProjeto] = useState([])
    const [servico, setServico] = useState([])
    const [mostrar, setMostrar] = useState(false)
    const [servicoid, setServicoid] = useState(0)
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


    function EnviarServico(projeto) {
        var ultimoservico = projeto.servicos[projeto.servicos.length - 1]
        setServicoid(servicoid + 1)
        ultimoservico.id = servicoid

        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then((data) => {
            setMostrar(false)
        })
        .catch(err => console.log(err))
    }

    function removerServico(e) {
        var IdServico = e.target.id
        projeto.servicos.filter((servico) => servico.id !== IdServico)
        console.log(projeto)
        
        // fetch(`http://localhost:5000/Projetos/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //     'Content-Type':"application/json"
        //     },
        //     body: JSON.stringify(ProjetoAtualizado)
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(err => console.log(err))
    }


    function ToggleMostrar() {
        setMostrar(!mostrar)
    }

    return (
        <div className={styles.VerProjeto}>
            <Navbar />
            {mostrar && (
                <div className={styles.CriarServico}>
                    <CriarServico setMostrar={ToggleMostrar} EnviarServico={EnviarServico} Projeto={projeto}/>
                </div>
                
            )}
            <div className={styles.Conteudo}>
                <div className={styles.Header}>
                    <h1>{projeto.nome}</h1>
                    <button className={styles.btn} onClick={ToggleMostrar}>Criar Serviço</button>
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
                                <h1>{servico.Nome}</h1>
                                <p>{servico.Custo}</p>
                                <p>{servico.Descricao}</p>
                                <button onClick={removerServico} id={servico.id}>Apagar Serviço</button>
                            </div>
                        ))}
                    </div>

                </div>


            </div>
        </div>
    )
}

export default VerProjeto