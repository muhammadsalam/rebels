import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs";
import useGameStatsStore from "entities/gameStats";
import AlignCenterIcon from "icons/align-center.svg?react";
import UserIcon from "icons/user.svg?react";

export const CoinsIsland: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const balance = useGameStatsStore((state) => state.balance);

    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.island__icon}>
                <AlignCenterIcon />
            </div>
            <div className={styles.island}>
                <CoinIcon className={styles.icon} />
                <strong className={styles.value}>
                    {formatNumber(balance, "en-EN")}
                </strong>
            </div>
            <div className={styles.island__icon}>
                <UserIcon />
            </div>
        </div>
    );
};
