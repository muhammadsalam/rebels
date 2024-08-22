import clsx from "clsx";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axios, formatNumber, tgApp } from "shared/libs";
import useQuestsStore, { Quest } from "entities/quests";
import useUserStore from "entities/user";
import { Loading } from "widgets/loading";

export const QuestsPage = () => {
    const quests = useQuestsStore((state) => state.quests);
    const fetchquests = useQuestsStore((state) => state.fetchQuests);
    const [tempStatus, setTempStatus] = useState<Record<number, string>>({});

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
    const isProcessing = useQuestsStore(state => state.isProcessing);

    const handleQuestClick = async (e: any, quest: Quest) => {
        try {
            console.log(isProcessing);
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
                await new Promise((resolve) => setTimeout(resolve, 3000));


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
            await setTempStatus((prev) => {
                const { [quest.id]: _, ...newState } = prev;
                return newState;
            });

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

            useQuestsStore.setState({ isProcessing: false })

        } catch (e: any) {
            alert(`Something went wrong. Please try again later. ${e.message}`);
        }
    };

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => setIsLoading(false), 1000);

    if (!quests.length || isLoading) return <Loading />

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Quests {quests.length}</h2>
            </div>

            <div className={styles.inner}>
                {quests.map((quest) => (
                    <div
                        key={quest.id}
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
                        <a
                            target="_blank"
                            href={quest.url}
                            onClick={(e) => handleQuestClick(e, quest)}
                            className={styles.quest_button}
                        >
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
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};
