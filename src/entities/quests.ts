import { axios } from 'shared/libs';
import { create } from 'zustand';

export type Quest = {
    id: number;
    name: string;
    reward: number;
    url: string;
    status: 'Start' | 'Check' | 'Claim' | 'Done';
    attemps: number;
    scenario: 1 | 2 | 3;
}

interface HeroState {
    quests: Quest[];
    isProcessing: boolean;
    fetchQuests: () => void;
}

const useQuestsStore = create<HeroState>((set, get) => ({
    quests: [],
    isProcessing: false,
    fetchQuests: async () => {
        try {
            const { status, data } = await axios.get('/task');

            if (status !== 200) {
                return alert('Something went wrong. Please try again later');
            }

            set({
                quests: data.map((item: Quest) => {
                    let scenario: 1 | 2 | 3;
                    const randomNumber = Math.floor(Math.random() * 100) + 1;

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
            console.log(get().quests);
        } catch (e) {
            console.error(e);
        }
    }
}));

export default useQuestsStore;
