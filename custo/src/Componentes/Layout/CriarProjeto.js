import { useState } from "react"
import styles from "./CriarProjeto.module.css"



function CriarProjeto({ mudarEstado, enviarProjeto}) {

    function setarForm(event) {
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        enviarProjeto(value)
    }

    return (
        <>
            
            <form className={styles.Formulario} onSubmit={setarForm}>
                <header className={styles.FormHeader}>
                    <h1>Criar Projeto</h1>
                    <i className='bx bxs-check-circle' onClick={mudarEstado}></i>
                </header>
                <label htmlFor="ProjNome">Nome do Projeto</label>
                <input type="text" name="nome" id="ProjNome" maxLength="20" />
                <label htmlFor="ProjTipo">Tipo do Projeto</label>
                <input type="text" name="tipo" id="ProjTipo" maxLength="20" />
                <label htmlFor="ProjOrca">Orçamento Inicial</label>
                <input type="number" name="orcamento" id="ProjOrca" />
                <label htmlFor="ProjPrazo">Prazo de Entrega</label>
                <input type="date" name="prazo" id="ProjPrazo" />
                <button type="submit">Cadastrar Projeto</button>
            </form>
        </>
    )
}

export default CriarProjeto