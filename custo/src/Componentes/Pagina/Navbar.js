import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Animated } from "react-animated-css"


function Navbar() {

    const [style1, setStyle1] = useState("menu")
    const [style2, setStyle2] = useState("popUp")

    function toggle() {
        setStyle1("menuOff")
        setStyle2("popUpShown")
    }

    function toggleOff() {
        setStyle1("menu")
        setStyle2("popUp")
    }

    return (
        <div className={styles.navbar}>
            <div onClick={toggle} className={`${styles[style1]}`}>
                <i class='bx bx-menu' id={styles.hamburguer}></i>
            </div>
            <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true} className={`${styles[style2]}`}>             
                    <header>
                        <h1>Jadefy</h1>
                        <i class='bx bx-x' onClick={toggleOff}></i>
                    </header>
                    <Link to={"/"}>
                        <div className={styles.row}>
                            <i class='bx bx-home' ></i>
                            <p>Home</p>
                        </div>
                    </Link>
                    <footer>
                        <h1>© 2024 Fernando Kohn</h1>
                    </footer>
            </Animated>

        </div>
    )
}

export default Navbar