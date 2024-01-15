import styles from "./CriarProjeto.module.css"


function CriarProjeto(MudarEstado) {

    const EnviarForm = (e) => {
        e.preventDefault()
        fetch("https://api.jsonbin.io/v3/b/65a58b47266cfc3fde7914b6", {
            method: "GET",
            headers: {
                "X-Master-key":"$2a$10$P91Taemis/4lebG1fO4lHe04u6tJJEIKvKhBtACSuqvfKLZc8sdlm"
            },
        })
        .then(response => response.json())
        .then(console.log(response))
        .catch(error => console.error("Error Fetching data:", error))
    }

    return (
     <form className={styles.Formulario}  onSubmit={EnviarForm}>
        <header className={styles.FormHeader}>
            <h1>Novo Projeto</h1>
            <button onClick={() => MudarEstado}>Voltar</button>
        </header>
        <label htmlFor="ProjNome">Nome do Projeto</label>
        <input type="text" name="nome" id="ProjNome" maxLength="20"/>
        <label htmlFor="ProjTipo">Tipo do Projeto</label>
        <input type="text" name="tipo" id="ProjTipo" maxLength="20" />
        <label htmlFor="ProjOrca">Orçamento Inicial</label>
        <input type="number" name="orcamento" id="ProjOrca" />
        <label htmlFor="ProjPrazo">Prazo de Entrega</label>
        <input type="date" name="prazo" id="ProjPrazo"/>
        <button type="submit">Cadastrar Projeto</button>
     </form>   
    )
}

export default CriarProjeto