import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";

export const CoinsIsland: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={styles.wrapper}>
            <CoinIcon className={styles.icon} />
            <strong className={styles.value}>100,842,080</strong>
        </div>
    );
};
