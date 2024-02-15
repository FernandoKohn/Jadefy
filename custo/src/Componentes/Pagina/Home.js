import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import imagem from "../../img/CofrePessoal.lnk.png"
import imagem2 from "../../img/a.png"
import imagem3 from "../../img/b.png"
import imagem4 from "../../img/c.png"
import imagem5 from "../../img/d.png"

function Home() {
    return (
        <div className={styles.home}>

                <div className={styles.divEsquerda}>
                    <h1>Gerenciar seu negócio nunca foi</h1>
                    <h1>tão <span className={styles.facil}>simples.</span></h1>
                    <p>Otimize seus projetos, maximize resultados. Faça acontecer com nosso <br /> gerenciador de projetos.</p>
                    <Link to="/Projeto">
                        <button className={styles.btn}>Criar Projeto</button>
                    </Link>
                </div>
                <div className={styles.divDireita}>
                    <img src={imagem5} alt="Logo Home" className={styles.imagem} />
                </div>
        </div>
    )
}


// <Link to="/Projeto">Criar Projeto</Link>
export default Home


