import styles from "./CriarServico.module.css"
import banner1 from "../../img/banner1.png"

function CriarServico({ setMostrar, EnviarServico, Projeto }) {

    function setarForm(event) {
        event.preventDefault()
        var data = new FormData(event.target)
        var value = Object.fromEntries(data.entries())
        Projeto.servicos.push(value)
        EnviarServico(Projeto)
    }


    return (
        <div className={styles.ServicoSection}>
            <div className={styles.Div1}>
                <img src={banner1} alt="banner" className={styles.Banner} />
            </div>
            <div className={styles.Div2}>
                <header className={styles.FormHeader}>
                    <h1>Criar Serviço</h1>
                    <p>Insira informações sobre o serviço que será cadastrado</p>
                </header>
                <form onSubmit={setarForm} className={styles.Formulario}>
                    <div className={styles.Row}>
                        <div>
                            <label htmlFor="ServNome">Nome do Serviço</label>
                            <input type="text" name="nome" id="ServNome" maxLength="20" placeholder="Insira o nome do serviço" required/>
                        </div>
                        <div>
                            <label htmlFor="ServCusto">Custo do Serviço</label>
                            <input type="number" name="custo" id="ServCusto" max="1000000000" placeholder="Insira o custo do serviço"/>
                        </div>
                    </div>
                    <div className={styles.Row}>
                        <div>
                            <label htmlFor="ServDescri">Descrição</label>
                            <input type="text" name="descricao" id="ServDescri" maxLength="40" placeholder="Descreva o serviço" required/>
                        </div>
                        <div>
                            <label htmlFor="ServPrazo">Prazo de Entrega</label>
                            <input type="date" name="prazo" id="ServPrazo" />
                        </div>
                    </div>
                    <div className={styles.Botoes}>
                        <button type="submit" className={styles.btn} onClick={setMostrar}>Voltar</button>
                        <button type="submit" className={styles.btn2}>Cadastrar Serviço</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CriarServico