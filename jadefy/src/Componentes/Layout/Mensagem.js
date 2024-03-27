import styles from "./Mensagem.module.css"

function Mensagem({tipo, mensagem, refreshpage}) {

    return (
        <div className={styles.ErrorDiv}>
            <p className={styles[tipo]}>{mensagem}</p>
            <i class='bx bx-revision' onClick={() => refreshpage()}></i>
        </div>
    )
}

export default Mensagem