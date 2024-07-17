import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs";
import useUserStore from "entities/user";
import clsx from "clsx";

export const CoinsIsland: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    const balance = useUserStore((state) => state.balance);

    return (
        <div {...props} className={clsx(styles.island, className)}>
            <CoinIcon className={styles.icon} />
            <strong className={styles.value}>
                {formatNumber(balance, "en-EN")}
            </strong>
        </div>
    );
};
