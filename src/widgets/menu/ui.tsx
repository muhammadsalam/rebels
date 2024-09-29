import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import TelegramIcon from "icons/social/telegram.svg?react";
import TwitterIcon from "icons/social/twitter.svg?react";
import { useCallback, useState } from "react";
import { ModalGift } from "widgets/modal-gift";
import { ModalReward, TReward } from "widgets/modal-reward";
import { Island } from "shared/ui";
import { useBodyLock } from "shared/libs/hooks";
import { useGameStatsStore, useUserStore } from "entities/user";
import useSound from "use-sound";
import clsx from "clsx";

const formatTimeRemaining = (secondsRemaining: number) => {
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : (minutes > 0 ? ` ${minutes}m` : '');
};

export const Menu = () => {
    useBodyLock();

    const [reward, setReward] = useState<TReward | null | number>(null);
    const [isDailyGiftActive, setIsDailyGiftActive] = useState(false);
    const [isRewardModalActive, setIsRewardModalActive] = useState(false);
    const daily_available_at = useGameStatsStore(state => state.daily_available_at);

    const onClaim = useCallback(() => {
        setIsRewardModalActive(false);
        setIsDailyGiftActive(false);
        setReward(null);
    }, []);

    const sounds = useUserStore(state => state.settings.sounds)

    const [playClickSound] = useSound('/assets/sounds/click.mp3');
    const handleDailyGift = useCallback(() => {
        sounds && playClickSound();
        setIsDailyGiftActive(true);
    }, [playClickSound, sounds]);

    const DateInSeconds = Math.floor(Date.now() / 1000);
    const secondsRemaining = daily_available_at - DateInSeconds;
    const isGiftAvailable = secondsRemaining <= 0;

    return (
        <>
            <div className={styles.menu}>
                <nav className={styles.nav}>
                    <Island tag='button' onClick={handleDailyGift} disabled={daily_available_at > DateInSeconds} className={clsx(styles.link, daily_available_at < DateInSeconds && styles.gift)}>
                        {
                            isGiftAvailable
                                ? 'Daily gift'
                                : `${formatTimeRemaining(secondsRemaining)}`
                        }
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
