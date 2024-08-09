import { axios } from 'shared/libs';
import { create } from 'zustand';

export type Quest = {
    id: number;
    name: string;
    reward: number;
    url: string;
    status: 'Start' | 'Check' | 'Claim' | 'Done';
}

interface HeroState {
    quests: Quest[];
    fetchQuests: () => void;
}

const useQuestsStore = create<HeroState>((set, _) => ({
    quests: [],
    fetchQuests: async () => {
        try {
            const { status, data } = await axios.get('/task');

            if (status !== 200) {
                return alert('Something went wrong. Please try again later');
            }

            set({ quests: data })
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
}));

export default useQuestsStore;
