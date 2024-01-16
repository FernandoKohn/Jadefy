import { useEffect, useState } from "react"
import styles from "./CriarProjeto.module.css"


function CriarProjeto({ MudarEstado, }) {

    const [projeto, setProjeto] = useState({})

    function EnviarForm(event) {
        event.preventDefault()
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        setProjeto(value)

        fetch("https://api.jsonbin.io/v3/b/65a6d271266cfc3fde79a01f?meta=false", {
            method: "POST",
            headers: {
                "X-MASTER-KEY": "$2a$10$P91Taemis/4lebG1fO4lHe04u6tJJEIKvKhBtACSuqvfKLZc8sdlm",
            },
            body: JSON.stringify(projeto),
        })
            .then(resp => resp.json())
            .then(data => console.log(data))

    }



return (
    <>

        <form className={styles.Formulario} onSubmit={EnviarForm}>
            <header className={styles.FormHeader}>
                <h1>Novo Projeto</h1>
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