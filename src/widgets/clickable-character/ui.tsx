import { FC, HTMLAttributes, MouseEventHandler, useRef } from "react";
import styles from "./styles.module.scss";

export const ClickableCharacter: FC<HTMLAttributes<HTMLDivElement>> = (
    props
) => {
    const timeoutIdRef = useRef<number | null>(null);

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as HTMLDivElement;

        target.classList.add(styles.wrapper__active);

        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = window.setTimeout(() => {
            target.classList.remove(styles.wrapper__active);
            timeoutIdRef.current = null;
        }, 150);
    };

    return (
        <div {...props} className={styles.wrapper} onClick={handleClick}>
            <img
                src="/assets/character.jpg"
                alt="asd"
                className={styles.person}
            />
        </div>
    );
};
