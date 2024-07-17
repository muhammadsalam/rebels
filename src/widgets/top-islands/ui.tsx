import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import AlignCenterIcon from "icons/align-center.svg?react";
import UserIcon from "icons/user.svg?react";
import { CoinsIsland } from "widgets/coins-island";

export const TopIslands: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.island__icon}>
                <AlignCenterIcon />
            </div>
            <CoinsIsland className={styles.island} />
            <div className={styles.island__icon}>
                <UserIcon />
            </div>
        </div>
    );
};
