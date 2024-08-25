import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import TelegramIcon from "icons/social/telegram.svg?react";
import TwitterIcon from "icons/social/twitter.svg?react";
import { useEffect, useState } from "react";
import { ModalGift } from "widgets/modal-gift";
import { ModalReward, TReward } from "widgets/modal-reward";
import { axios } from "shared/libs";

export const Menu = () => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, []);

    const [reward, setReward] = useState<TReward | null | number>(null);
    const [isDailyGiftActive, setIsDailyGiftActive] = useState(false);
    const [isRewardModalActive, setIsRewardModalActive] = useState(false);

    const onClaim = () => {
        setIsRewardModalActive(false);
        setIsDailyGiftActive(false);
        setReward(null);
    };

    const handleDailyGift = () => {
        setIsDailyGiftActive(true);
    };

    // УБРАТЬ
    const handleBABLO = () => {
        try {
            setIsRewardModalActive(true);
            setIsDailyGiftActive(false);

            for (let i = 0; i < 35; i++) {
                axios.get(`/spin/run?${0}`)
            }
        } catch (e) {
            console.log(e);
            alert("Something went wrong. Please try again later");
        }
    };

    return (
        <>
            <div className={styles.menu}>
                <button onClick={handleBABLO} className={styles.BABLO}>💰</button>
                <nav className={styles.nav}>
                    <button className={styles.link} onClick={handleDailyGift}>
                        Daily gift
                    </button>
                    <Link
                        className={styles.link}
                        to="/about"
                        children="About"
                    />
                    <Link className={styles.link} to="/faq" children="FAQ" />
                </nav>
                <div className={styles.links}>
                    <a
                        className={styles.link__icon}
                        target="_blank"
                        href="https://t.me/rebelscommunity"
                    >
                        <TelegramIcon />
                    </a>
                    <a
                        className={styles.link__icon}
                        target="_blank"
                        href="https://x.com/gameoftherebels"
                    >
                        <TwitterIcon />
                    </a>
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
