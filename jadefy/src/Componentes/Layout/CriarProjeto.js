
import styles from "./CriarProjeto.module.css"
import banner1 from "../../img/Banner_ProGrid.png"





function CriarProjeto({ mudarEstado, enviarProjeto, setEstilo2 }) {

    function setarForm(event) {
        event.preventDefault()
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        enviarProjeto(value)
        mudarEstado()
    }

    function handleVisibility() {
        mudarEstado()
        setEstilo2()
    }

    return (

        <div className={styles.FormularioSection}>
            <div className={styles.Div1}>
                <img src={banner1} alt="banner" className={styles.Banner} />
            </div>
            <div className={styles.Div2}>
                <header className={styles.FormHeader}>
                    <h1>Criar Projeto</h1>
                    <p>Forneça informações básicas sobre o seu projeto <br /> Podem ser alteradas depois</p>
                </header>
                <form onSubmit={setarForm} className={styles.Formulario}>
                    <div className={styles.Row}>
                        <div>
                            <label htmlFor="ProjNome">Nome do Projeto</label>
                            <input type="text" name="nome" id="ProjNome" maxLength="20" placeholder='Insira o nome do projeto' required />
                        </div>
                        <div>
                            <label htmlFor="ProjTipo">Tipo do Projeto</label>
                            <input type="text" name="tipo" id="ProjTipo" maxLength="40" placeholder='Insira o tipo do projeto' />
                        </div>
                    </div>
                    <div className={styles.Row}>
                        <div>
                            <label htmlFor="ProjOrca">Orçamento</label>
                            <input type="number" placeholder="Orçamento do projeto" max="1000000000" name="orcamento" id="ProjOrca" required/>
                        </div>
                        <div>
                            <label htmlFor="ProjPrazo">Prazo de Entrega</label>
                            <input type="date" name="prazo" id="ProjPrazo" required />
                        </div>
                    </div>
                    <div className={styles.Botoes}>
                        <button type="button" className={styles.btn} onClick={handleVisibility}>Voltar</button>
                        <button type="submit" className={styles.btn2}>Cadastrar Projeto</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CriarProjeto