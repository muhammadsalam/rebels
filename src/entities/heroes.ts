import { axios } from 'shared/libs';
import { create } from 'zustand';

export type Card = {
    id: number;
    level: number,
    knowledge_step: number,
    loyalty_step: number,
    influence_step: number,
    changed: boolean;
    influence: number;
    knowledge: number;
    loyalty: number;
    name: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
    upgrade_price: number;
}

interface HeroState {
    cards: Card[];
    team: Card[];
    team_skills: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };
    saveTeam: (tempTeam: Card[]) => void;
    upgradeCard: (hero_id: number) => Promise<Boolean>;
}

const useHeroStore = create<HeroState>((set, get) => ({
    cards: [],
    team: [],
    team_skills: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
    saveTeam: async (tempTeam: Card[]) => {
        try {
            const prevTeam = get().team;

            const { status } = await axios.post('/user/heroes/change', tempTeam.reduce<{ hero_id: number, new_hero_id: number }[]>((newTeam, item, index) => {
                if (item.id !== prevTeam[index]?.id) {
                    newTeam.push({
                        hero_id: prevTeam[index]?.id as number, new_hero_id: item.id
                    });
                }

                return newTeam;
            }, []));

            if (status === 200) {
                set({ team: tempTeam });
            }
        } catch (e) {
            console.log(e);
        }
    },
    upgradeCard: async (hero_id) => {
        try {
            const { status, data } = await axios.post('/user/heroes/upgrade', { hero_id })

            if (status === 200) {
                console.log('upgraded', data);
                return true
            }

            return false
        } catch (e) {
            console.log(e);
            return false;
        }
    },
}));

export default useHeroStore;
