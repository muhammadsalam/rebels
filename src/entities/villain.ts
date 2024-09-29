import { create } from 'zustand';

interface VillainState {
    id: number | null;
    health: number;
    current_health: number;
    name: string;
    current_name: string,
    image: string,
    current_image: string,
    level: number;
    current_level: number;
    wasted: boolean;
    description: string;
    current_description: string;
    new_level_reward: number | null;

    toggleVillain: () => void;
}

export const useVillainStore = create<VillainState>((set) => ({
    id: null,
    health: 0,
    current_health: 0,
    name: '',
    current_name: '',
    image: '',
    current_image: '',
    level: 0,
    current_level: 0,
    description: '',
    current_description: '',
    wasted: false,
    new_level_reward: null,

    toggleVillain: () => set((state) => ({
        current_image: state.image,
        current_name: state.name,
        current_level: state.level,
        current_description: state.description,
        wasted: false,
        new_level_reward: null,
    })),
}));