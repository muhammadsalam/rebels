import { FC, useEffect, useState } from "react";
import styles from './styles.module.scss';
import clsx from "clsx";
import { tgApp } from "shared/libs/utils";
import { useReferralStore } from "entities/referral";

export const RefLevelUpModal: FC = () => {
    const level = useReferralStore((state) => state.level);
    const prev_level = useReferralStore((state) => state.prev_level);

    const levelUpgradingCondition = level !== prev_level;
    const [isLevelUpgradedShow, setIsLevelUpgradedShow] = useState(false);

    useEffect(() => {
        const levelUpgrade = async () => {
            if (levelUpgradingCondition) {
                new Audio('/assets/sounds/upgrade.mp3').play()
                await new Promise(resolve => setTimeout(resolve, 200));

                setIsLevelUpgradedShow(true)

                await setTimeout(() => {
                    setIsLevelUpgradedShow(false);
                }, 2000);

                useReferralStore.setState({ prev_level: level });

                if (parseFloat(tgApp.version) > 6.9) {
                    tgApp.CloudStorage.setItem("ref_level", level);
                } else {
                    localStorage.setItem("ref_level", level);
                }

            }
        }
        levelUpgrade();
    }, []);

    if (!isLevelUpgradedShow) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modal_overlay}></div>
            <div className={clsx(styles.levelup, styles[`levelup__${level.toLowerCase()}`])}>
                <div className={styles.overflow}>
                    <p className={styles.levelup_text}>Congratulations!</p>
                </div>
                <div className={styles.overflow}>
                    <strong className={styles.levelup_title}>{level}</strong>
                </div>
                <div className={styles.overflow}>
                    <span className={styles.levelup_subtitle}>New referral tier</span>
                </div>
            </div>
        </div>
    )

}