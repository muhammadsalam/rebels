import { FC, HTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";
import AlignCenterIcon from "icons/align-center.svg?react";
import UserIcon from "icons/user.svg?react";
import { CoinsIsland } from "widgets/coins-island";
import { Menu } from "widgets/menu";
import CloseIcon from "icons/close.svg?react";
import clsx from "clsx";

export const TopIslands: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const [isAciveMenu, setIsActiveMenu] = useState(false);

    const handleMenuOpen = () => {
        setIsActiveMenu((state) => !state);
    };

    return (
        <div {...props} className={styles.wrapper}>
            {isAciveMenu && <Menu />}
            <div
                className={clsx(
                    styles.island__icon,
                    isAciveMenu && styles.close
                )}
                onClick={handleMenuOpen}
            >
                {isAciveMenu ? (
                    <CloseIcon width={20} height={20} />
                ) : (
                    <AlignCenterIcon />
                )}
            </div>
            <CoinsIsland className={styles.island} />
            <div className={styles.island__icon}>
                <UserIcon />
            </div>
        </div>
    );
};
