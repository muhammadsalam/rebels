import clsx from "clsx";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axios, formatNumber, showAlert, tgApp } from "shared/libs/utils";
import useQuestsStore, { Quest } from "entities/quests";
import { useUserStore } from "entities/user";

export const QuestsPage = () => {
    const quests = useQuestsStore((state) => state.quests);
    const [tempStatus, setTempStatus] = useState<Record<number, string>>({});

    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);
    const isProcessing = useQuestsStore(state => state.isProcessing);

    const handleQuestClick = async (e: any, quest: Quest) => {
        try {
            if (isProcessing) return e.preventDefault();

            useQuestsStore.setState({ isProcessing: true })

            // если не показано старт, то пропускаем
            if (quest.status !== "Start" && tempStatus[quest.id] !== "Start") e.preventDefault();

            if (quest.status === 'Check') {
                if (tempStatus[quest.id] === 'Start') {
                    useQuestsStore.setState({ isProcessing: false })
                    // Показываем статус "Check"
                    return setTempStatus((prev) => ({ ...prev, [quest.id]: "Check" }));
                }

                // Показываем статус "Checking" на 3 секунды
                setTempStatus((prev) => ({ ...prev, [quest.id]: "Checking" }));
                await new Promise((resolve) => setTimeout(resolve, quest.type === "TELEGRAM" ? 0 : 3000));

                switch (quest.scenario) {
                    // при первом сценарии принимаем сразу
                    case 1:
                        break;
                    case 2:
                        if (quest.attemps === 1) {
                            setTempStatus((prev) => ({
                                ...prev,
                                [quest.id]: "Failed"
                            }));
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            setTempStatus((prev) => ({ ...prev, [quest.id]: "Start" }));
                            useQuestsStore.setState({ isProcessing: false })

                            return useQuestsStore.setState({
                                quests: quests.map((item) =>
                                    item.id === quest.id
                                        ? { ...item, attemps: 2 }
                                        : item
                                ),
                            });
                        }
                        break;
                    case 3:
                        if (quest.attemps <= 2) {
                            setTempStatus((prev) => ({
                                ...prev,
                                [quest.id]: "Failed"
                            }));
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            setTempStatus((prev) => ({ ...prev, [quest.id]: "Start" }));
                            useQuestsStore.setState({ isProcessing: false })
                            return useQuestsStore.setState({
                                quests: quests.map((item) =>
                                    item.id === quest.id
                                        ? { ...item, attemps: quest.attemps + 1 }
                                        : item
                                ),
                            });
                        }
                        break;

                }
            }

            // удаление статуса "Checking" и "Failed"
            quest.type !== "TELEGRAM" && await setTempStatus((prev) => {
                const { [quest.id]: _, ...newState } = prev;
                return newState;
            });

            const { data } = await axios.post(
                `task/${quest.status.toLowerCase()}`,
                { task_id: quest.id }
            );



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

            useQuestsStore.setState({ isProcessing: false })

        } catch (error: any) {
            if (error.response?.status === 422) {
                setTempStatus((prev) => ({
                    ...prev,
                    [quest.id]: "Failed"
                }));

                await new Promise((resolve) => setTimeout(resolve, 3000));
                setTempStatus((prev) => ({ ...prev, [quest.id]: "Start" }));

                useQuestsStore.setState({ isProcessing: false })

                return;
            }

            showAlert(`Something went wrong. Please try again later. ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Quests {quests.length}</h2>
            </div>

            <div className={styles.inner}>
                {quests.map((quest) => (
                    <a
                        key={quest.id}
                        onClick={(e) => handleQuestClick(e, quest)}
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
