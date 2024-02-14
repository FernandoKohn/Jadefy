import styles from "./Navbar.module.css"
import { Link } from "react-router-dom" 
import logo from "../../img/logo4.png"
function Navbar() {
    return (
        <div className={styles.Navbar}>
            <img src={logo} className={styles.Logo} alt="Logo"/>
            <h1>Custo</h1>
            <ul className={styles.Navigation}>
                <Link className={styles.li} to="/"><span>Home</span></Link>
                <Link className={styles.li} to="/Projeto"><span>Projeto</span></Link>
                <Link className={styles.li} to="/Sobre"><span>Sobre</span></Link>
            </ul>

        </div>
    )
}

export default Navbar