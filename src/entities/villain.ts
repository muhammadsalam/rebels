import { create } from 'zustand';

interface VillainState {
    id: number | null;
    health: number;
    name: string;
    level: number;
    current_health: number;
    setVillain: (villain: Partial<VillainState>) => void;
}

const useVillainStore = create<VillainState>((set) => ({
    id: null,
    health: 0,
    name: '',
    level: 0,
    current_health: 0,
    setVillain: (villain) => set(villain),
}));

export default useVillainStore;
