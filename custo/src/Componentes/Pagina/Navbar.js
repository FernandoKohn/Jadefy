import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
function Navbar() {
    return (
        <div className={styles.Navbar}>

            <img className={styles.Logo} src="https://e7.pngegg.com/pngimages/911/734/png-clipart-computer-icons-money-cost-symbol-acon-miscellaneous-blue.png" alt="Logo" />


            <ul className={styles.Navigation}>
                <Link to="/">Home</Link>
                <Link to="/Projeto">Projeto</Link>
                <Link to="/Sobre">Sobre</Link>
            </ul>

        </div>
    )
}

export default Navbar