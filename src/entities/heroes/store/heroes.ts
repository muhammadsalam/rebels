import { create } from 'zustand';
import { Card, HeroState } from '../model/heroes.types';

export const useHeroStore = create<HeroState>((set, get) => ({
    cards: [],
    team: [],
    team_skills: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
    max_team_skills: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
    teamFromCards: () => {
        const team = get().cards.filter((item: Card) => item.position !== null);
        set({
            team: team.concat(
                (new Array(5) as Card[]).fill({
                    photo: '',
                    id: 0,
                    level: 0,
                    count: 0,
                    knowledge_step: 0,
                    loyalty_step: 0,
                    influence_step: 0,
                    position: null,
                    influence: 0,
                    knowledge: 0,
                    loyalty: 0,
                    name: "",
                    rarity: "Common",
                    upgrade_price: 0,
                })
            ).slice(0, 5).map((item: Card, index: number) => {
                return { ...item, position: item.position ?? index }
            })
        });
    },
}));
