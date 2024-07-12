import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import HeartIcon from "icons/heart.svg?react";
import BatteryIcon from "icons/battery.svg?react";

export const CharacterStatus: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.heart_icon}>
                <HeartIcon />
            </div>
            <div className={styles.heart_count}>
                <span>95 500</span>
                <span>288 000</span>
            </div>
            <div className={styles.line}>
                <div className={styles.line_inner}></div>
            </div>
            <div className={styles.battery_count}>
                <span>1 500</span>
                <span>3 500</span>
            </div>
            <div className={styles.battery_icon}>
                <BatteryIcon />
            </div>
        </div>
    );
};
