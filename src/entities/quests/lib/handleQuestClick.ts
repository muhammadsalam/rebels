import { axios, showAlert } from "shared/libs/utils";
import { Quest } from "../model/quests.types";
import { useQuestsStore } from "../store/quests";
import { useUserStore } from "entities/user";
import { CHECK_QUESTS } from "../model/CONSTANTS";

export const handleQuestClick = async (
    e: any,
    quest: Quest,
    tempStatus: Record<number, string>,
    setTempStatus: (value: React.SetStateAction<Record<number, string>>) => void,
    playClickSound: () => void,
    playClaimSound: () => void,
    isProcessing: boolean,
    sounds: boolean,
    quests: Quest[]

) => {
    try {
        if (isProcessing) return e.preventDefault();

        useQuestsStore.setState({ isProcessing: true })

        // если не показано старт, то пропускаем
        if (quest.status !== "Start" && tempStatus[quest.id] !== "Start") {
            e.preventDefault();
        }

        if (quest.status === "Start" || tempStatus[quest.id] === "Start") {
            sounds && playClickSound()
        }

        if (quest.status === 'Check') {
            if (tempStatus[quest.id] === 'Start') {
                useQuestsStore.setState({ isProcessing: false })
                // Показываем статус "Check"
                return setTempStatus((prev) => ({ ...prev, [quest.id]: "Check" }));
            }

            // Показываем статус "Checking" на 3 секунды
            setTempStatus((prev) => ({ ...prev, [quest.id]: "Checking" }));
            await new Promise((resolve) => setTimeout(resolve, CHECK_QUESTS.includes(quest.type) ? 0 : 3000));

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

        const { status, data } = await axios.post(
            `task/${quest.status.toLowerCase()}`,
            { task_id: quest.id }
        );

        if (status !== 200) return;

        if (data.status) {
            useQuestsStore.setState({
                quests: quests.map((item) =>
                    item.id === quest.id
                        ? { ...item, status: data.new_status }
                        : item
                ),
            });

            if (data.new_status === "Done") {
                useUserStore.setState({
                    balance: data.user_balance,
                });

                sounds && playClaimSound();
            }
        }

        setTempStatus((prev) => {
            const { [quest.id]: _, ...newState } = prev;
            return newState;
        });

        useQuestsStore.setState({ isProcessing: false })

    } catch (error: any) {
        if (error.response?.status === 400) {
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