import styles from "./Loading.module.css"

function Loading({tipo}) {
    return (
        <>
            <div className={styles.Loading}>
                <p>{tipo}</p>
                <i class='bx bx-loader-circle bx-tada' ></i>
            </div>
        </>
    )
}

export default Loading