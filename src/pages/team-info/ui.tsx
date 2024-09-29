import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import styles from "./styles.module.scss";
import { useBackButton } from "shared/libs/hooks";
import clsx from "clsx";

export const TeamInfoPage = () => {
    useBackButton('/roster');

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>Roster info</h2>
                </div>
            </div>

            <div className={styles.skills}>
                <div className={clsx(styles.block, styles.block__knowledge)}>
                    <strong className={styles.block_title}><SwordIcon /> Knowledge</strong>
                    <p className={styles.block_description}>
                        Expand your wisdom! Knowledge increases your base damage per tap and boosts the number of points earned with each mining cycle.
                    </p>
                </div>
                <div className={clsx(styles.block, styles.block__loyality)}>
                    <strong className={styles.block_title}><FlashIcon /> Loyalty</strong>
                    <p className={styles.block_description}>
                        Loyalty makes every tap more efficient. Reduce energy consumption per tap and extend the duration of your mining cycle.
                    </p>
                </div>
                <div className={clsx(styles.block, styles.block__influence)}>
                    <strong className={styles.block_title}><SkullIcon /> Influence</strong>
                    <p className={styles.block_description}>
                        Harness the power of Influence! Increase your chance of landing critical strikes with every tap.
                    </p>
                </div>
            </div>
        </div>
    );
};
