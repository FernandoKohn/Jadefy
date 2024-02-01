import { useState } from "react"
import styles from "./CriarServico.module.css"

function CriarServico({setMostrar, EnviarServico, ProjetoId}) {

    function setarForm(event) {
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        EnviarServico(value)
    }


    return (
        <>
        <form className={styles.Formulario} onSubmit={setarForm} id={ProjetoId}>
                <header className={styles.FormHeader}>
                    <h1>Criar serviço</h1>
                    <i className='bx bxs-check-circle' onClick={setMostrar}></i>
                </header>
                <label htmlFor="ServNome">Nome do Serviço</label>
                <input type="text" name="nome" id="ServNome" maxLength="20"  />
                <label htmlFor="ServCusto">Custo do Serviço</label>
                <input type="number" name="orcamento" id="ServCusto" />
                <label htmlFor="ServDescri">Descrição</label>
                <input type="text" name="prazo" id="ServDescri" maxLength="100" />
                <button type="submit">Cadastrar Serviço</button>
        </form>
        </>
    )
}

export default CriarServico