import { axios, showAlert } from 'shared/libs/utils';
import { create } from 'zustand';

export type QuestType = 'TELEGRAM' | any;

export type Quest = {
    id: number;
    name: string;
    reward: number;
    url: string;
    status: 'Start' | 'Check' | 'Claim' | 'Done';
    attemps: number;
    scenario: 1 | 2 | 3;
    type: QuestType;
}

interface HeroState {
    quests: Quest[];
    isProcessing: boolean;
    fetchQuests: () => void;
}

const useQuestsStore = create<HeroState>((set) => ({
    quests: [],
    isProcessing: false,
    fetchQuests: async () => {
        try {
            const { status, data } = await axios.get('/task');

            if (status !== 200) {
                throw new Error('Something went wrong. Please try again later');
            }

            set({
                quests: data.map((item: Quest) => {
                    let scenario: 1 | 2 | 3;
                    const randomNumber = Math.floor(Math.random() * 100) + 1;

                    console.log(item);
                    if (item.type === "TELEGRAM") {
                        return { ...item, attemps: 1, scenario: 1 }
                    }

                    if (randomNumber <= 20) {
                        scenario = 1;
                    } else if (randomNumber <= 60) {
                        scenario = 2;
                    } else {
                        scenario = 3;
                    }

                    return { ...item, attemps: 1, scenario }
                })
            })
        } catch (e) {
            showAlert('Something went wrong. Please try again later. ' + e);
        }
    }
}));

export default useQuestsStore;
