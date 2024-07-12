import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export const ClickableCharacter: FC<HTMLAttributes<HTMLDivElement>> = (
    props
) => {
    return (
        <div {...props} className={styles.wrapper}>
            <img
                src="/assets/character.jpg"
                alt="asd"
                className={styles.person}
            />
        </div>
    );
};
