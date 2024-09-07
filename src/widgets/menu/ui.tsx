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
import { useGameStatsStore, useUserStore } from "entities/user";
import { useHeroStore } from "entities/heroes";
import useSound from "use-sound";
import clsx from "clsx";


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
    }, [playClickSound]);

    const [playCaseSound] = useSound('/assets/sounds/cases.mp3');
    // УБРАТЬ
    const handleBABLO = async () => {
        try {
            setIsRewardModalActive(true);
            setIsDailyGiftActive(false);

            sounds && playCaseSound();

            for (let i = 0; i < 75; i++) {
                const { status, data } = await axios.get(`/spin/run`);

                if (status !== 200) {
                    setIsRewardModalActive(false);
                    throw new Error("Something went wrong. Please try again later");
                }

                if (data.prize.toLowerCase() === "points") {
                    setReward(data.points);
                    useUserStore.setState({
                        balance: data.balance,
                    });
                }

                if (data.prize.toLowerCase() === "hero") {
                    setReward(data.hero);
                    useHeroStore.setState({ cards: data.heroes });
                    useHeroStore.getState().teamFromCards();
                    useGameStatsStore.setState({
                        next_level_value: data.profile.next_level_value,
                        start_level_value: data.profile.start_value,
                        total_value: data.profile.total_value,
                        total_values: data.profile.total_values,
                    });
                    useUserStore.setState({
                        level_name: data.profile.level_name,
                        level: data.profile.level
                    })
                }

                useGameStatsStore.setState({
                    energy_update: data.energy_update,
                    max_energy: data.max_energy,
                    daily_available_at: (Date.now() + 10000) / 1000
                })
            }
        } catch (e) {
            showAlert("Something went wrong. Please try again later. " + e);
        }
    };

    const DateInSeconds = +Date.now() / 1000;

    return (
        <>
            <div className={styles.menu}>
                <button onClick={handleBABLO} className={styles.BABLO}>💰</button>
                <nav className={styles.nav}>
                    <Island tag='button' onClick={handleDailyGift} disabled={daily_available_at > DateInSeconds} className={clsx(styles.link, daily_available_at < DateInSeconds && styles.gift)}>
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
