import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export const CharacterInfo: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.name}>Arthur Hayes</div>
            <span className={styles.level}>1 lvl</span>
        </div>
    );
};
