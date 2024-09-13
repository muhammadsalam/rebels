import { useUserStore } from "entities/user";
import { FC, useEffect, useState } from "react";
import TrophyIcon from "icons/trophy.svg?react";
import styles from './styles.module.scss';
import useSound from "use-sound";

export const LevelUpModal: FC = () => {
    const level = useUserStore((state) => state.level);
    const level_name = useUserStore((state) => state.level_name);
    const prev_level = useUserStore((state) => state.prev_level);

    const levelUpgradingCondition = level !== prev_level;
    const [isLevelUpgradedShow, setIsLevelUpgradedShow] = useState(false);
    const [playUpgradeSound] = useSound('/assets/sounds/upgrade.mp3');

    useEffect(() => {
        const levelUpgrade = async () => {
            if (levelUpgradingCondition) {
                setIsLevelUpgradedShow(true)
                playUpgradeSound()
                await setTimeout(() => {
                    setIsLevelUpgradedShow(false);
                }, 2000);
                useUserStore.setState({ prev_level: level });
            }
        }
        levelUpgrade();
    }, [level]);

    if (!isLevelUpgradedShow) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modal_overlay}></div>
            <div className={styles.levelup}>
                <div className={styles.overflow}>
                    <p className={styles.levelup_text}>Congratulations!</p>
                </div>
                <div className={styles.overflow}>
                    <strong className={styles.levelup_title}>{level_name}</strong>
                </div>
                <div className={styles.overflow}>
                    <span className={styles.levelup_subtitle}>New rank</span>
                </div>
                <div className={styles.overflow}>
                    <div className={styles.levelup_rank}>
                        <TrophyIcon /> <span>{level}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}