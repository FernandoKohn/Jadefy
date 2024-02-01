import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import styles from "./VerProjeto.module.css"
import { useParams } from "react-router-dom"
import CriarServico from "../Layout/CriarServico"


function VerProjeto() {
    const [projeto, setProjeto] = useState([])
    const [servico, setServico] = useState([])
    const [mostrar, setMostrar] = useState(false)
    var { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/Projetos/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(resp => resp.json())
            .then(data => setProjeto(data))
            .catch(err => console.log(err))
    }, [id])

    function EnviarServico(servico) {
        fetch('http://localhost:5000/Servicos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servico)
        })
        .then(resp => resp.json())
        .then(() => {
            setMostrar(false)
        })
    }


    function ToggleMostrar() {
        setMostrar(!mostrar)
    }

    return (
        <div className={styles.VerProjeto}>
            <Navbar />
            {mostrar && (
                <div className={styles.CriarServico}>
                    <CriarServico setMostrar={ToggleMostrar} EnviarServico={EnviarServico} ProjetoId={id}/>
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
                    {servico.length > 0 && (
                        <p>a</p>
                    )}
                </div>


            </div>
        </div>
    )
}

export default VerProjeto