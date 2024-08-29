import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import TelegramIcon from "icons/social/telegram.svg?react";
import TwitterIcon from "icons/social/twitter.svg?react";
import { useCallback, useState } from "react";
import { ModalGift } from "widgets/modal-gift";
import { ModalReward, TReward } from "widgets/modal-reward";
import { axios, showAlert } from "shared/libs/utils";
import { Island } from "shared/ui";
import { useBodyLock } from "shared/libs/hooks";

export const Menu = () => {
    useBodyLock();

    const [reward, setReward] = useState<TReward | null | number>(null);
    const [isDailyGiftActive, setIsDailyGiftActive] = useState(false);
    const [isRewardModalActive, setIsRewardModalActive] = useState(false);

    const onClaim = useCallback(() => {
        setIsRewardModalActive(false);
        setIsDailyGiftActive(false);
        setReward(null);
    }, []);

    const handleDailyGift = useCallback(() => {
        setIsDailyGiftActive(true);
    }, []);

    // УБРАТЬ
    const handleBABLO = () => {
        try {
            setIsRewardModalActive(true);
            setIsDailyGiftActive(false);

            for (let i = 0; i < 100; i++) {
                axios.get(`/spin/run?${0}`)
            }
        } catch (e) {
            showAlert("Something went wrong. Please try again later. " + e);
        }
    };

    return (
        <>
            <div className={styles.menu}>
                <button onClick={handleBABLO} className={styles.BABLO}>💰</button>
                <nav className={styles.nav}>
                    <Island tag='button' onClick={handleDailyGift} className={styles.link}>
                        Daily gift
                    </Island>
                    <Island
                        tag={Link}
                        to="/about"
                        className={styles.link}
                    >
                        About
                    </Island>
                    <Island
                        tag={Link}
                        to="/faq"
                        className={styles.link}
                    >
                        FAQ
                    </Island>
                </nav>
                <div className={styles.links}>
                    <Island
                        tag='a'
                        target="_blank"
                        className={styles.link__icon}
                        href="https://t.me/joinrebels"
                    >
                        <TelegramIcon />
                    </Island>
                    <Island
                        tag='a'
                        className={styles.link__icon}
                        target="_blank"
                        href="https://x.com/gameoftherebels"
                    >
                        <TwitterIcon />
                    </Island>
                </div>
            </div>

            {isDailyGiftActive && (
                <ModalGift
                    onModalHide={onClaim}
                    setReward={setReward}
                    setIsRewardModalActive={setIsRewardModalActive}
                    setIsDailyGiftActive={setIsDailyGiftActive}
                />
            )}

            {isRewardModalActive && (
                <ModalReward reward={reward} handleClaimChest={onClaim} />
            )}
        </>
    );
};
