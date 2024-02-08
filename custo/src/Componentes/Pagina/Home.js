import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import imagem from "../../img/CofrePessoal.lnk.png"
import imagem2 from "../../img/a.png"
import imagem3 from "../../img/b.png"
import imagem4 from "../../img/c.png"

function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.divEsquerda}>
                <h1>Gerenciar seu negócio nunca foi</h1>
                <h1>tão <span className={styles.facil}>simples.</span></h1>
                <p>Otimize seus projetos, maximize resultados. Faça acontecer com nosso <br/> gerenciador de projetos.</p>
                <button className={styles.btn}>Criar Projeto</button>
            </div>
            <div className={styles.divDireita}>
                <img src={imagem4} alt="Logo Home" className={styles.imagem} />
            </div>
        </div>
    )
}


// <Link to="/Projeto">Criar Projeto</Link>
export default Home


