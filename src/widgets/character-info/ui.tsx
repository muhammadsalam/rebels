import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import useVillainStore from "entities/villain";

export const CharacterInfo: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const current_name = useVillainStore((state) => state.current_name);
    const current_level = useVillainStore((state) => state.current_level);

    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.name}>{current_name}</div>
            <span className={styles.level}>{current_level} lvl</span>
        </div>
    );
};
