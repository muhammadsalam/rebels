import { create } from 'zustand';

export type Card = {
    id: number;
    level: number,
    knowledge_step: number,
    loyalty_step: number,
    influence_step: number,
    position: number | null;
    influence: number;
    knowledge: number;
    loyalty: number;
    name: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legend';
    upgrade_price: number;
    count: number;
}

interface HeroState {
    cards: Card[];
    team: Card[];
    team_skills: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };
}

const useHeroStore = create<HeroState>(() => ({
    cards: [],
    team: [],
    team_skills: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
}));

export default useHeroStore;
