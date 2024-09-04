import { FC, HTMLAttributes, memo } from "react";
import styles from "./styles.module.scss";
import HeartIcon from "icons/heart.svg?react";
import useVillainStore from "entities/villain";
import { useGameStatsStore } from "entities/user";
import { formatNumber } from "shared/libs/utils";
import { Island, Line } from "shared/ui";

export const CharacterStatus: FC<HTMLAttributes<HTMLDivElement>> = memo(
    (props) => {
        const health = useVillainStore((state) => state.health);
        const current_health = useVillainStore((state) => state.current_health);
        const current_energy = useGameStatsStore(
            (state) => state.energy_balance
        );
        const max_energy = useGameStatsStore((state) => state.max_energy);
        const energyPercentage = (current_energy / max_energy) * 100;

        return (
            <div {...props} className={styles.wrapper}>
                <Island className={styles.heart_icon}>
                    <HeartIcon />
                </Island>
                <div className={styles.heart_count}>
                    <span>{formatNumber(current_health)}</span>
                    <span>{formatNumber(health)}</span>
                </div>
                <div className={styles.lines}>
                    <Line
                        height={9}
                        width={(current_health / health) * 100}
                        className={styles.line}
                        innerClassName={styles.line__health}
                    />
                    <Line
                        height={9}
                        width={(current_energy / max_energy) * 100}
                        className={styles.line}
                        innerClassName={styles.line__energy}
                    />
                </div>
                <div className={styles.battery_count}>
                    <span>{formatNumber(current_energy)}</span>
                    <span>{formatNumber(max_energy)}</span>
                </div>
                <Island className={styles.battery_icon}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.66667 4H2V15.6667H17V12.3333H18.6667V7.33333H17V4H3.66667ZM15.3333 5.66667V14H3.66667V5.66667H15.3333Z"
                            fill="#C4EB2A"
                        />
                        {energyPercentage > 10 && (
                            <path
                                d="M6.99999 7.33334H5.33333V12.3333H6.99999V7.33334Z"
                                fill="#C4EB2A"
                            />
                        )}
                        {energyPercentage > 40 && (
                            <path
                                d="M8.66667 7.33334H10.3333V12.3333H8.66667V7.33334Z"
                                fill="#C4EB2A"
                            />
                        )}
                        {energyPercentage > 75 && (
                            <path
                                d="M12 7.33334H13.6667V12.3333H12V7.33334Z"
                                fill="#C4EB2A"
                            />
                        )}
                    </svg>
                </Island>
            </div>
        );
    }
);
