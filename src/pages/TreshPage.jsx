import styles from "../styles/Tresh.module.scss"
import { SlArrowRight } from "react-icons/sl";
import { RxDividerHorizontal } from "react-icons/rx";


export const TreshPage = () => {
    return (
        <div className={styles.all}>


            <div className={styles.header}>
                <header>
                    <img src="./assets/logo (1).svg" alt="" />

                    <input placeholder="Найти товар" type="text" />

                    <div>
                        <img src="./assets/MainMenu (1).svg" alt="" />
                        <img src="./assets/MainMenu (2).svg" alt="" />
                    </div>
                </header>
            </div>


            <div className={styles.transition}>
                <a href="http://localhost:5173/" >Главная</a> <SlArrowRight/> <span>Корзина</span>
            </div>
            <div className={styles.text}>
                <h1>Корзина</h1>
            </div>

            <div>
                <button> <RxDividerHorizontal/> </button> <span>Выделить всё</span>
            </div>


            
        </div>
    )
}
