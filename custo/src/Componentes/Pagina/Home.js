import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import gif1 from "../../img/gif1.gif"
import gif2 from "../../img/gif2.gif"
import Typed from "typed.js";
import { useRef, useEffect } from "react";


function Home() {

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Contratar designer", "Comprar material", "Alinhar ideias", "Montar Fluxograma"], // Strings to display
            // Speed settings, try diffrent values untill you get good results
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 90,
            backDelay: 100,
            loop: true
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <div className={styles.home}>   
            <div className={styles.content}>
                <div className={styles.div1}>
                    <h1>Gerenciar seu</h1>
                    <h1> negócio nunca</h1>
                    <h1>foi tão<span className={styles.simples}> simples.</span></h1>
                </div>
                <div className={styles.div2}>
                    <div>
                        <img src={gif1} alt="gif" />
                        <h1>Gestão de Projetos</h1>
                        <p>Desde a concepção até a conclusão, acompanhe cada fase do seu projeto de forma intuitiva e eficiente.</p>
                    </div>
                    <div>
                        <img src={gif2} alt="gif" />
                        <h1>Análise de Custos</h1>
                        <p>Mantenha-se no orçamento com ferramentas poderosas de análise de custos, fornecendo insights valiosos para tomadas de decisões informadas.</p>
                    </div>
                </div>
                <div className={styles.div3}>
                    <div className={styles.opaco1}></div>
                    <div className={styles.opaco2}></div>
                    <div className={styles.opaco3}></div>
                    <div className={styles.opaco4}></div>
                    <div className={styles.popup}>
                        <p className={styles.servicoTag}>Serviço</p>
                        <div>
                            <p>Projeto: Startup</p>
                            <h1><span ref={el}></span></h1>
                        </div>
                        <button className={styles.btn2}>Adicionar serviço</button>
                    </div> 
                    <div className={styles.banner}>
                        <h1>ProGrid, seu aliado para o sucesso!</h1>
                        <p>Transforme a gestão de projetos e custos com ProGrid. Desenvolvida para simplificar e otimizar cada etapa do seu projeto.</p>
                        <Link to="/Projeto">
                        <button className={styles.btn}>Começar!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


// <Link to="/Projeto">Criar Projeto</Link>
export default Home


