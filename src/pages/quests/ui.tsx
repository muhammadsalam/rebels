import clsx from "clsx";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";

export const QuestsPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Quests 12</h2>
            </div>

            <div className={styles.inner}>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Follow X</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__start
                        )}
                    >
                        Start
                    </button>
                </div>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Follow X</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__check
                        )}
                    >
                        Check
                    </button>
                </div>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Join Discord</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__claim
                        )}
                    >
                        Claim
                    </button>
                </div>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Follow Instagram</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__done
                        )}
                    >
                        Done
                    </button>
                </div>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Follow X</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__start
                        )}
                    >
                        Start
                    </button>
                </div>
                <div className={styles.quest}>
                    <div className={styles.quest_info}>
                        <p className={styles.quest_title}>Follow X</p>
                        <p className={styles.quest_price}>
                            <CoinIcon width={16} height={16} /> 120 000
                        </p>
                    </div>
                    <button
                        className={clsx(
                            styles.quest_button,
                            styles.quest_button__start
                        )}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};
