import { axios, showAlert } from 'shared/libs/utils';
import { create } from 'zustand';
import { HeroState, Quest } from '../model/quests.types';
import { CHECK_QUESTS } from '../model/CONSTANTS';

export const useQuestsStore = create<HeroState>((set) => ({
    quests: [],
    isProcessing: false,
    fetchQuests: async () => {
        try {
            const { data } = await axios.get('/task');

            set({
                quests: data.map((item: Quest) => {
                    let scenario: 1 | 2 | 3;
                    const randomNumber = Math.floor(Math.random() * 100) + 1;

                    if (CHECK_QUESTS.includes(item.type)) {
                        return { ...item, attemps: 1, scenario: 1 }
                    }

                    if (randomNumber <= 30) {
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