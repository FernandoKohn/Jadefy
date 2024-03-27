import styles from "./Loading.module.css"

function Loading({tipo,aviso}) {

    return (
        <>
            <div className={styles.Loading}>
                <div>
                    <h1>{tipo}</h1>
                    <i class='bx bx-loader-circle bx-tada' ></i>
                </div>
            </div>
        </>
    )
}

export default Loading