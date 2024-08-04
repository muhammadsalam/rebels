import clsx from "clsx";
import styles from "./styles.module.scss";
import { HTMLAttributes } from "react";

export const Switcher: React.FC<
    {
        active: boolean;
        handleSwitch: () => void;
    } & HTMLAttributes<HTMLDivElement>
> = ({ active, handleSwitch, ...props }) => {
    return (
        <div {...props} className={styles.switcher} onClick={handleSwitch}>
            <div
                className={clsx(styles.toggle, active && styles.toggle__active)}
            ></div>
        </div>
    );
};
