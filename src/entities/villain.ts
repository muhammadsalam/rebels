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
}

const useVillainStore = create<VillainState>(() => ({
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
}));

export default useVillainStore;