import clsx from "clsx";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { useState } from "react";
import { formatNumber } from "shared/libs/utils";
import { useUserStore } from "entities/user";
import useSound from "use-sound";
import { handleQuestClick, useQuestsStore } from "entities/quests";
import { useBackButton } from "shared/libs/hooks";

export const QuestsPage = () => {
    useBackButton();

    const quests = useQuestsStore((state) => state.quests);
    const [tempStatus, setTempStatus] = useState<Record<number, string>>({});

    const isProcessing = useQuestsStore(state => state.isProcessing);

    const sounds = useUserStore(state => state.settings.sounds)
    const [playClickSound] = useSound('/assets/sounds/pageclicks.mp3');
    const [playClaimSound] = useSound('/assets/sounds/claim.mp3');

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Quests {quests.length}</h2>
            </div>

            <div className={styles.inner}>
                {quests.map((quest) => (
                    <a
                        key={quest.id}
                        onClick={(e) => handleQuestClick(e, quest, tempStatus, setTempStatus, playClickSound, playClaimSound, isProcessing, sounds, quests)}
                        target="_blank"
                        href={quest.url}
                        className={clsx(
                            styles.quest,
                            styles[
                            `quest__${(tempStatus[quest.id] || quest.status).toLowerCase()}`
                            ]
                        )}
                    >
                        <div className={styles.quest_info}>
                            <p className={styles.quest_title}>{quest.name}</p>
                            <p className={styles.quest_price}>
                                <CoinIcon width={16} height={16} />{" "}
                                {formatNumber(quest.reward, "ru-RU")}
                            </p>
                        </div>
                        <span className={styles.quest_button} >
                            {
                                tempStatus[quest.id] === "Checking" ? <>
                                    Checking
                                    <div className={styles.loader}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </> : tempStatus[quest.id] || quest.status
                            }
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};
