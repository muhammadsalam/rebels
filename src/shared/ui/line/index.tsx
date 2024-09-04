import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface LineProps extends HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
    innerClassName?: string;
}

export const Line: FC<LineProps> = ({
    height,
    width,
    className,
    innerClassName,
    ...props
}) => {
    return (
        <div
            {...props}
            className={clsx(className, styles.line, styles.line__health)}
        >
            <div
                className={clsx(innerClassName, styles.line_inner)}
                style={{ height: `${height}px` }}
            >
                <div
                    className={styles.elem}
                    style={{ width: `${width}%`, minWidth: `${height}px` }}
                ></div>
            </div>
        </div>
    );
};
