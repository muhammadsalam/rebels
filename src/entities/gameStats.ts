import { create } from 'zustand';

interface GameStatsState {
    damage: number;
    critical_chance: number;
    energy_balance: number;
    energy_usage: number;
    max_energy: number;
    mining_balance: number;
    mining_max_points: number;
    mining_duration: number;
    mining_claimed_at: number;
    setGameStats: (stats: Partial<GameStatsState>) => void;
    addEnergy: (amount: number) => void;
}

const useGameStatsStore = create<GameStatsState>((set) => ({
    damage: 0,
    critical_chance: 5,
    energy_balance: 0,
    energy_usage: 0,
    max_energy: 0,
    mining_balance: 0,
    mining_max_points: 0,
    mining_duration: 0,
    mining_claimed_at: 0,
    setGameStats: (stats) => set(stats),
    addEnergy: (amount: number) => {
        set((state) => ({
            energy_balance: Math.min(state.energy_balance + amount, state.max_energy),
        }));
    },
}));

export default useGameStatsStore;
