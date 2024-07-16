import { create } from 'zustand';

interface VillainState {
    id: number | null;
    health: number;
    name: string;
    level: number;
    current_health: number;
}

const useVillainStore = create<VillainState>(() => ({
    id: null,
    health: 0,
    name: '',
    level: 0,
    current_health: 0,
}));

export default useVillainStore;