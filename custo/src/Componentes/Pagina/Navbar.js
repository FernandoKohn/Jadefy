import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
function Navbar() {
    return (
        <div className={styles.Navbar}>
            <h1>Custo</h1>
            <ul className={styles.Navigation}>
                <Link to="/">Home</Link>
                <Link to="/Projeto">Projeto</Link>
                <Link to="/Sobre">Sobre</Link>
            </ul>

        </div>
    )
}

export default Navbar