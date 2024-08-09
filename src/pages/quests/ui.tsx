import clsx from "clsx";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axios, formatNumber, tgApp } from "shared/libs";
import useQuestsStore, { Quest } from "entities/quests";
import useUserStore from "entities/user";

export const QuestsPage = () => {
    const quests = useQuestsStore((state) => state.quests);
    const fetchquests = useQuestsStore((state) => state.fetchQuests);

    const navigate = useNavigate();
    useEffect(() => {
        fetchquests();

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const handleQuestClick = async (e: any, quest: Quest) => {
        try {
            if (quest.status !== "Start") e.preventDefault();

            const { status, data } = await axios.post(
                `task/${quest.status.toLowerCase()}`,
                { task_id: quest.id }
            );

            if (status !== 200) {
                return alert("Something went wrong. Please try again later");
            }

            if (data.status && data.new_status === "Done") {
                useUserStore.setState({
                    balance: data.user_balance,
                });
            }

            if (data.status) {
                useQuestsStore.setState({
                    quests: quests.map((item) =>
                        item.id === quest.id
                            ? { ...item, status: data.new_status }
                            : item
                    ),
                });
            }
        } catch (e) {
            console.log(e);
            alert("Something went wrong. Please try again later");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Quests {quests.length}</h2>
            </div>

            <div className={styles.inner}>
                {quests.map((quest) => (
                    <div key={quest.id} className={styles.quest}>
                        <div className={styles.quest_info}>
                            <p className={styles.quest_title}>{quest.name}</p>
                            <p className={styles.quest_price}>
                                <CoinIcon width={16} height={16} />{" "}
                                {formatNumber(quest.reward, "ru-RU")}
                            </p>
                        </div>
                        <a
                            target="_blank"
                            href={quest.url}
                            onClick={(e) => handleQuestClick(e, quest)}
                            className={clsx(
                                styles.quest_button,
                                styles[
                                    `quest_button__${quest.status.toLowerCase()}`
                                ]
                            )}
                        >
                            {quest.status}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};
