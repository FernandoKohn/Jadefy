import styles from "./Home.module.css"
import { Link } from "react-router-dom"
function Home() {
    return (
        <div className={styles.home}>
            <h1>Custo!</h1>
            <p>Comece a gerenciar seu projeto agora</p>
            <Link to="/Projeto">Criar Projeto</Link>
        </div>
    )
}

export default Home