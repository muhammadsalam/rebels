import { FC, HTMLAttributes, TouchEventHandler, useRef } from "react";
import styles from "./styles.module.scss";

export const ClickableCharacter: FC<HTMLAttributes<HTMLDivElement>> = (
    props
) => {
    const timeoutIdRef = useRef<number | null>(null);

    const handleOnTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
        const event = e.targetTouches[0];
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = 0.5 - (event.clientY - rect.top) / rect.height;

        target.style.transform = `perspective(1500px) rotateX(${
            y * 40
        }deg) rotateY(${x * 40}deg)`;

        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = window.setTimeout(() => {
            target.style.transform =
                "perspective(1500px) rotateX(0deg) rotateY(0deg)";
            timeoutIdRef.current = null; // Сбросим идентификатор таймера после его завершения
        }, 123);
    };

    return (
        <div
            {...props}
            className={styles.wrapper}
            onTouchStart={handleOnTouchStart}
        >
            <img
                src="/assets/character.jpg"
                alt="asd"
                className={styles.person}
            />
        </div>
    );
};
