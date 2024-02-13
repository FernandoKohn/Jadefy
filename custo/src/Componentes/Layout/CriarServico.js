import { useState } from "react"
import styles from "./CriarServico.module.css"

function CriarServico({setMostrar, EnviarServico, Projeto}) {

    function setarForm(event) {
        event.preventDefault()
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        Projeto.servicos.push(value)
        EnviarServico(Projeto)
    }


    return (
        <>
        <form className={styles.Formulario} onSubmit={setarForm}>
                <header className={styles.FormHeader}>
                    <h1>Criar serviço</h1>
                    <i className='bx bxs-check-circle' onClick={setMostrar}></i>
                </header>
                <label htmlFor="ServNome">Nome do Serviço</label>
                <input type="text" name="nome" id="ServNome" maxLength="20"  />
                <label htmlFor="ServCusto">Custo do Serviço</label>
                <input type="number" name="custo" id="ServCusto" />
                <label htmlFor="ServDescri">Descrição</label>
                <input type="text" name="descricao" id="ServDescri" maxLength="100" />
                <label htmlFor="ServPrazo">Prazo de Entrega</label>
                <input type="date" name="prazo" id="ServPrazo" />
                <button type="submit">Cadastrar Projeto</button>
        </form>
        </>
    )
}

export default CriarServico