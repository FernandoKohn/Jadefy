import { useState } from "react"
import styles from "./CriarProjeto.module.css"



function EditarProjeto({ mostrarEditar, id, nome, tipo, orcamento, prazo, editarProjeto }) {

    function setarForm(event) {
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        editarProjeto(value, id)
    }

    return (
        <>
            
            <form className={styles.Formulario} onSubmit={setarForm}>
                <header className={styles.FormHeader}>
                    <h1>Editar Projeto</h1>
                    <i className='bx bxs-check-circle' onClick={mostrarEditar}></i>
                </header>
                <label htmlFor="ProjNome">Nome do Projeto</label>
                <input type="text" name="nome" id="ProjNome" maxLength="20" defaultValue={nome} />
                <label htmlFor="ProjTipo">Tipo do Projeto</label>
                <input type="text" name="tipo" id="ProjTipo" maxLength="20" defaultValue={tipo} />
                <label htmlFor="ProjOrca">Orçamento Inicial</label>
                <input type="number" name="orcamento" id="ProjOrca" defaultValue={orcamento}/>
                <label htmlFor="ProjPrazo">Prazo de Entrega</label>
                <input type="date" name="prazo" id="ProjPrazo" defaultValue={prazo}/>
                <button type="submit">Cadastrar Projeto</button>
            </form>
        </>
    )
}

export default EditarProjeto