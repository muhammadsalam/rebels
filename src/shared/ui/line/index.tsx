import clsx from "clsx";
import { FC, HTMLAttributes, memo, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface LineProps extends HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
    withPadding?: boolean;
}


export const Line: FC<LineProps> = memo(({
    height,
    width,
    className,
    withPadding = false,
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [wrapperWidth, setWrapperWidth] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setWrapperWidth(divRef.current.clientWidth);
        }
    }, []);

    return (
        <div
            ref={divRef}
            {...props}
            className={clsx(className, styles.line, (wrapperWidth / 100 * width) < height && styles.line__overflow, withPadding && styles.line__padding)}
        >
            <div className={styles.inner}>
                <div
                    className={styles.elem}
                    style={{ width: `${width}%`, height: `${height}px` }}
                ></div>
            </div>
        </div>
    );
});
