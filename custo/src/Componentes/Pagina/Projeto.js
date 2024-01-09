import styles from "./Projeto.module.css"
import Navbar from "./Navbar"
import { useState } from "react"
import CriarProjeto from "../Layout/CriarProjeto"


function Projeto() {

    const [mostrar, Setmostrar] = useState(false)

    function MudarEstado() {
        Setmostrar(!mostrar)
    }


    return (
        <div className={styles.Projeto}> 
            <Navbar></Navbar>
            <div className={styles.CriarProjeto}>
                {mostrar && (
                    <CriarProjeto/>
                )}
            </div>
            <div className={styles.Conteudo}>
                <div className={styles.Header}>
                    <h1>Meus projetos</h1>
                    <button onClick={MudarEstado} className={styles.btn}>Criar Projeto</button>
                </div>
                <div className={styles.Projetos}>
                
                </div>
            </div>
        </div>
    )
}

export default Projeto