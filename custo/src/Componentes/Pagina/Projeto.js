import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"


function Projeto() {

    const [mostrar, setMostrar] = useState(false)
    const [projetos, setProjetos] =useState([])

    function mudarEstado() {
        setMostrar(!mostrar)
    }

    function enviarProjeto(projeto) {
        fetch("http://localhost:5000/Projetos", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(projeto)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch("http://localhost:5000/Projetos", {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjetos(data)
        })
    },[])


    return (
        <div className={styles.Projeto}> 
            <Navbar></Navbar>
        
                {mostrar && (
                    <div className={styles.CriarProjeto}>
                    <CriarProjeto enviarProjeto={enviarProjeto} mudarEstado={mudarEstado}/>
                    </div>
                )}
            
            <div className={styles.Conteudo}>
                <div className={styles.Header}>
                    <h1>Meus projetos</h1>
                    <button onClick={mudarEstado} className={styles.btn}>Criar Projeto</button>
                </div>
                <div className={styles.Projetos}>
                    {projetos.length > 0 && (
                        projetos.map((projeto) => {
                            
                        })
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Projeto