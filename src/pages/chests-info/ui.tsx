import useChestsStore from "entities/chests";
import styles from "./styles.module.scss";
import clsx from "clsx";
import ChestIcon from "icons/chest.svg?react";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs";

export const ChestsInfoPage = () => {
    const chests = useChestsStore((state) => state.chests);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>Chests info</h2>
                </div>
            </div>

            <div className={styles.chests}>
                {chests.map((chest) => {
                    return (
                        <div
                            key={chest.id}
                            className={clsx(
                                styles.chest,
                                styles[`chest__${chest.rarity.toLowerCase()}`],
                                chest.count > 0 && styles.chest__available
                            )}
                        >
                            <div className={styles.chest_icon}>
                                <ChestIcon />
                            </div>
                            <div className={styles.chest_info}>
                                <strong className={styles.chest_title}>
                                    {chest.rarity}
                                    {chest.count > 0 && (
                                        <span
                                            className={styles.chest_title_span}
                                        >
                                            {chest.count}
                                        </span>
                                    )}
                                </strong>
                                <p className={styles.chest_price}>
                                    <CoinIcon className={styles.chest_coin} />
                                    {formatNumber(chest.price, "ru-RU")}
                                </p>
                            </div>

                            <button
                                className={styles.chest_button}
                                onClick={() => {}}
                            >
                                {chest.count > 0 ? "Open" : "Buy"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
