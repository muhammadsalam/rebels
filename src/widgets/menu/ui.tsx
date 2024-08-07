import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import TelegramIcon from "icons/social/telegram.svg?react";
import TwitterIcon from "icons/social/twitter.svg?react";
import { useEffect, useState } from "react";
import { ModalGift } from "widgets/modal-gift";
import { ModalReward } from "widgets/modal-reward";

export const Menu = () => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, []);

    const [reward, setReward] = useState<
        { name: string; rarity: string } | null | number
    >(null);
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

    return (
        <>
            <div className={styles.menu}>
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
                        href="https://t.me/rebelscommunity"
                    >
                        <TelegramIcon />
                    </a>
                    <a
                        className={styles.link__icon}
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
