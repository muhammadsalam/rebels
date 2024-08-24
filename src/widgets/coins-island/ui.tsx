import { FC, HTMLAttributes, memo } from "react";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs";
import useUserStore from "entities/user";
import clsx from "clsx";
import useVillainStore from "entities/villain";

export const CoinsIsland: FC<HTMLAttributes<HTMLDivElement>> = memo(({
    className,
    ...props
}) => {
    const balance = useUserStore((state) => state.balance);
    const new_level_reward = useVillainStore((state) => state.new_level_reward);

    return (
        <div {...props} className={clsx(styles.island, className)}>
            <CoinIcon className={styles.icon} />
            <strong className={clsx(styles.value, new_level_reward && styles.reward)}>
                {new_level_reward ? ` +${formatNumber(new_level_reward, "en-EN")}` : formatNumber(balance, "en-EN")}
            </strong>
        </div>
    );
});
