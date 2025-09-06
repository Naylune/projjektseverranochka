import { useState } from "react";
import styles from "../styles/Tresh.module.scss";
import { SlArrowRight } from "react-icons/sl";
import { RxDividerHorizontal, RxCheck } from "react-icons/rx";
import smile from "./assets/smile.webp";

export const TreshPage = () => {
    const [active, setActive] = useState(false);
    const [cart, setCart] = useState([]);
    const [useCard, setUseCard] = useState(false);

    const addToCart = (product) => {
        const exist = cart.find((item) => item.id === product.id);
        if (exist) return;
        setCart((prev) => [...prev, { ...product, quantity: 1, selected: false }]);
    };

    const toggleSelectAll = () => {
        setActive((prev) => !prev);
        setCart((prev) => prev.map((item) => ({ ...item, selected: !active })));
    };

    const toggleSelectItem = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const increment = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrement = (id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeSelected = () => {
        setCart((prev) => prev.filter((item) => !item.selected));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const discount = useCard ? 100 : 0;
    const finalPrice = totalPrice - discount;
    const bonus = Math.floor(totalPrice / 10);

    const formatPrice = (value) => value.toFixed(2).replace(/\.00$/, "");

    return (
        <div className={styles.all}>

            <div className={styles.transition}>
                <a href="/">Главная</a> <SlArrowRight /> <span>Корзина</span>
            </div>

            <div className={styles.text}>
                <h1>Корзина</h1>
                {totalItems > 0 && (
                    <span className={styles.cartCounter}>{totalItems}</span>
                )}
            </div>

            <div className={styles.select}>
                <button
                    className={`${styles.button} ${active ? styles.activeButton : ""}`}
                    onClick={toggleSelectAll}
                >
                    <RxDividerHorizontal className={styles.iconButton} />
                </button>
                <span className={styles.span1}>Выделить всё</span>
                <span className={styles.span2} onClick={removeSelected}>
                    Удалить выбранные
                </span>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.cartItems}>
                    {cart.length === 0 && <p>Корзина пуста</p>}
                    {cart.map((item) => {
                        const isChecked = item.selected || active;
                        return (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className={styles.productImage}
                                    />
                                    <div
                                        className={`${styles.checkIcon}`}
                                        style={{
                                            backgroundColor: isChecked ? "#70C05B" : "#FBF8EC",
                                        }}
                                        onClick={() => toggleSelectItem(item.id)}
                                    >
                                        <RxCheck
                                            className={styles.checkIconInner}
                                            style={{
                                                color: isChecked ? "white" : "#414141",
                                                background: isChecked ? "#70C05B" : "",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.leftBlock}>
                                    <h3 className={styles.productName}>{item.name}</h3>
                                    <p className={styles.unitPrice}>
                                        {formatPrice(item.price)} {item.currency} за шт.
                                    </p>
                                </div>
                                <div className={styles.rightBlock}>
                                    <div className={styles.quantityControls}>
                                        <button onClick={() => decrement(item.id)}>-</button>
                                        <span className={styles.spanPrice}>{item.quantity}</span>
                                        <button onClick={() => increment(item.id)}>+</button>
                                    </div>
                                    <span className={styles.totalPrice}>
                                        {formatPrice(item.quantity * item.price)} {item.currency}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.checkout}>
                    <div className={styles.switchWrapper}>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={useCard}
                                onChange={() => setUseCard(!useCard)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <div className={styles.switchText}>
                            Списать {formatPrice(useCard ? discount : 0)} ₽
                        </div>
                    </div>

                    <div className={styles.infoRow}>
                        <span>На карте накоплено {formatPrice(discount)} ₽</span>
                    </div>

                    <div className={styles.createLine}></div>

                    <div className={styles.infoRow}>
                        <span>{totalItems} товара</span>
                        <span className={styles.text1}>{formatPrice(totalPrice)} ₽</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span>Скидка</span>
                        <span className={styles.text2}>-{formatPrice(discount)} ₽</span>
                    </div>

                    <div className={styles.createLine}></div>

                    <div className={styles.infoRow}>
                        <span>Итог</span>
                        <span className={styles.text3}>{formatPrice(finalPrice)} ₽</span>
                    </div>

                    <div className={styles.bonus}>
                        <img src={smile} alt="бонус" />
                        <span>Вы получаете {bonus} бонусов</span>
                    </div>

                    <div className={styles.orderBtn}>
                        {totalPrice < 1000 ? (
                            <div className={styles.minOrder}>
                                <span>Минимальная сумма заказа 1000 ₽</span>
                                <button>Оформить заказ</button>
                            </div>
                        ) : (
                            <button>Оформить заказ</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
