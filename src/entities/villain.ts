import { create } from 'zustand';

interface VillainState {
    id: number | null;
    health: number;
    name: string;
    next_name: string,
    image: string,
    current_image: string,
    level: number;
    current_health: number;
    wasted: boolean;
}

const useVillainStore = create<VillainState>(() => ({
    id: null,
    health: 0,
    name: '',
    next_name: '',
    image: '/assets/character.jpg',
    current_image: '/assets/character.jpg',
    level: 0,
    current_health: 0,
    wasted: false,
}));

export default useVillainStore;