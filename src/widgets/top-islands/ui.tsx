import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { Island } from "shared/ui";
import styles from "./styles.module.scss";
import AlignCenterIcon from "icons/align-center.svg?react";
import UserIcon from "icons/user.svg?react";
import { CoinsIsland } from "widgets/coins-island";
import { Menu } from "widgets/menu";
import CloseIcon from "icons/close.svg?react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useUserStore } from "entities/user";
import { tgApp } from "shared/libs/utils";
import useSound from "use-sound";
import clickSound from "/assets/sounds/pageclicks.mp3";

export const TopIslands: FC<HTMLAttributes<HTMLDivElement>> = memo((props) => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const sounds = useUserStore((state) => state.settings.sounds);

    const [playClickSound] = useSound(clickSound);

    const handleMenuOpen = useCallback(() => {
        sounds && playClickSound();
        setIsActiveMenu((state) => !state);
    }, [playClickSound, sounds]);

    const handleVibroToggle = useCallback(() => {
        const newVibroState = !sounds;

        useUserStore.setState((state) => ({
            ...state,
            settings: { ...state.settings, sounds: newVibroState },
        }));

        if (parseFloat(tgApp.version) > 6.9) {
            tgApp.CloudStorage.setItem("sounds", newVibroState);
        } else {
            localStorage.setItem("sounds", "" + newVibroState);
        }
    }, [sounds]);

    return (
        <div {...props} className={styles.wrapper}>
            <Island
                className={clsx(isActiveMenu && styles.close)}
                onClick={handleMenuOpen}
            >
                {isActiveMenu ? (
                    <CloseIcon width={20} height={20} />
                ) : (
                    <AlignCenterIcon />
                )}
            </Island>

            {isActiveMenu && (
                <Island
                    tag="button"
                    onClick={handleVibroToggle}
                    className={styles.vibro}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.16667 1.6665H10.8333V18.3332H9.16667V16.6665H7.5V14.9998H9.16667V4.99984H7.5V3.33317H9.16667V1.6665ZM5.83333 6.6665V4.99984H7.5V6.6665H5.83333ZM5.83333 13.3332H2.5V6.6665H5.83333V8.33317H4.16667V11.6665H5.83333V13.3332ZM5.83333 13.3332V14.9998H7.5V13.3332H5.83333Z"
                            fill="#B6B6B6"
                        />

                        {sounds ? (
                            <>
                                <path
                                    d="M12.5 8.33333H14.1667V11.6667H12.5V8.33333Z"
                                    fill="#B6B6B6"
                                />
                                <path
                                    d="M15.8333 6.66667H17.5V13.3333H15.8333V15H12.5V13.3333H15.8333V6.66667H12.5V5H15.8333V6.66667Z"
                                    fill="#B6B6B6"
                                />
                            </>
                        ) : (
                            <path
                                d="M14.1667 9.35661H15.8333V7.68994H17.5V9.35661H15.8333V11.0233H17.5V12.6899H15.8333V11.0233H14.1667V12.6899H12.5V11.0233H14.1667V9.35661H12.5V7.68994H14.1667V9.35661Z"
                                fill="#B6B6B6"
                            />
                        )}
                    </svg>
                    Sound {!sounds ? "off" : "on"}
                </Island>
            )}

            {isActiveMenu && <Menu />}

            <CoinsIsland />

            <Island tag={Link} to="/profile">
                <UserIcon />
            </Island>
        </div>
    );
});
