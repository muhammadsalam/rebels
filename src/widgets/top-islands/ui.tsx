import { FC, HTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";
import AlignCenterIcon from "icons/align-center.svg?react";
import UserIcon from "icons/user.svg?react";
import { CoinsIsland } from "widgets/coins-island";
import { Menu } from "widgets/menu";
import CloseIcon from "icons/close.svg?react";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const TopIslands: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handleMenuOpen = () => {
        setIsActiveMenu((state) => !state);
    };

    const [vibration, setVibration] = useState(false);

    return (
        <div {...props} className={styles.wrapper}>
            <div
                className={clsx(
                    styles.island__icon,
                    isActiveMenu && styles.close
                )}
                onClick={handleMenuOpen}
            >
                {isActiveMenu ? (
                    <CloseIcon width={20} height={20} />
                ) : (
                    <AlignCenterIcon />
                )}
            </div>
            {isActiveMenu && <button className={styles.vibro} onClick={() => setVibration(state => !state)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_777_3948)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.54589 12.3406L7.54589 14.561L6.03027 14.561L6.03027 12.3406L7.54589 12.3406Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.03053 7.90199L6.03053 12.3408L4.51562 12.3408L4.51562 7.90199L6.03053 7.90199Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.54589 5.6814L7.54589 7.90186L6.03027 7.90186L6.03027 5.6814L7.54589 5.6814Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.27343 16.7806L5.27343 19L3.75781 19L3.75781 16.7806L5.27343 16.7806Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.27343 3.46191L5.27343 1.2425L3.75781 1.2425L3.75781 3.46191L5.27343 3.46191Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7571 14.5609L3.7571 16.7803L2.24219 16.7803L2.24219 14.5609L3.7571 14.5609Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7571 5.68164L3.7571 3.46223L2.24219 3.46223L2.24219 5.68164L3.7571 5.68164Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24245 5.68125L2.24245 14.561L0.727539 14.561L0.727539 5.68125L2.24245 5.68125Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4551 12.3406L12.4551 14.561L13.9707 14.561L13.9707 12.3406L12.4551 12.3406Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9704 7.90199L13.9704 12.3408L15.4854 12.3408L15.4854 7.90199L13.9704 7.90199Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4551 5.6814L12.4551 7.90186L13.9707 7.90186L13.9707 5.6814L12.4551 5.6814Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7275 16.7806L14.7275 19L16.2432 19L16.2432 16.7806L14.7275 16.7806Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7275 3.46191L14.7275 1.2425L16.2432 1.2425L16.2432 3.46191L14.7275 3.46191Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2429 14.5609L16.2429 16.7803L17.7578 16.7803L17.7578 14.5609L16.2429 14.5609Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2429 5.68164L16.2429 3.46223L17.7578 3.46223L17.7578 5.68164L16.2429 5.68164Z" fill="#B6B6B6" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7585 5.68125L17.7585 14.561L19.2734 14.561L19.2734 5.68125L17.7585 5.68125Z" fill="#B6B6B6" />
                        {vibration && <>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 2L18 -8.62713e-08L20 4.18072e-08L20 2L18 2Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 4L16 2L18 2L18 4L16 4Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 6L14 4L16 4L16 6L14 6Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L12 6L14 6L14 8L12 8Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 10L10 8L12 8L12 10L10 10Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12L8 10L10 10L10 12L8 12Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 14L6 12L8 12L8 14L6 14Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 16L4 14L6 14L6 16L4 16Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 18L2 16L4 16L4 18L2 18Z" fill="#B6B6B6" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18072e-08 20L1.0148e-07 18L2 18L2 20L4.18072e-08 20Z" fill="#B6B6B6" />
                        </>}
                    </g>
                    <defs>
                        <clipPath id="clip0_777_3948">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                Vibro {vibration ? 'off' : 'on'}
            </button>}
            {isActiveMenu && <Menu />}
            <CoinsIsland className={styles.island} />
            <Link to="/profile" className={styles.island__icon}>
                <UserIcon />
            </Link>
        </div>
    );
};
