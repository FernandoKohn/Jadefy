import { useEffect, useState } from "react"
import styles from "./CriarProjeto.module.css"


function CriarProjeto({ MudarEstado, }) {

    const [projeto, setProjeto] = useState([])

    function EnviarForm(event) {
        event.preventDefault()
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        setProjeto(value)
        fetch('https://my-json-server.typicode.com/FernandoKohn/CustoDB/projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }

    return (
        <>

            <form className={styles.Formulario} onSubmit={EnviarForm}>

                <header className={styles.FormHeader}>
                    <h1>Criar Projeto</h1>
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