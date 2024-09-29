export type Card = {
    id: number;
    level: number,
    photo: string,
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

export interface HeroState {
    cards: Card[];
    team: Card[];
    team_skills: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };
    max_team_skills: {
        knowledge: number;
        loyalty: number;
        influence: number;
    }
    teamFromCards: () => void;
}