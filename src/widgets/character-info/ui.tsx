import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import useVillainStore from "entities/villain";

export const CharacterInfo: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const name = useVillainStore((state) => state.name);
    const level = useVillainStore((state) => state.level);

    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.name}>{name}</div>
            <span className={styles.level}>{level} lvl</span>
        </div>
    );
};
