import { create } from 'zustand';

interface VillainState {
    id: number | null;
    health: number;
    name: string;
    next_name: string,
    image: string,
    next_image: string,
    level: number;
    current_health: number;
}

const useVillainStore = create<VillainState>(() => ({
    id: null,
    health: 0,
    name: '',
    next_name: '',
    image: '/assets/character.jpg',
    next_image: '',
    level: 0,
    current_health: 0,
}));

export default useVillainStore;