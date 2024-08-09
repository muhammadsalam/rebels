import { axios } from 'shared/libs';
import { create } from 'zustand';

interface GameStatsState {
    isProfileLoading: boolean;
    total_value: number;
    next_level_value: number;
    total_hero_values: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };
    damage: number;
    critical_chance: number;
    energy_balance: number;
    energy_usage: number;
    max_energy: number;
    mining_balance: number;
    mining_speed: number;
    mining_max_points: number;
    mining_duration: number;
    mining_claimed_at: number;
    setGameStats: (stats: Partial<GameStatsState>) => void;
    addEnergy: (amount: number) => void;
    startMining: () => void;
}

const useGameStatsStore = create<GameStatsState>((set) => ({
    isProfileLoading: false,
    total_value: 0,
    next_level_value: 0,
    total_hero_values: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
    damage: 0,
    critical_chance: 5,
    energy_balance: 0,
    energy_usage: 0,
    max_energy: 0,
    mining_balance: 0,
    mining_speed: 0,
    mining_max_points: 0,
    mining_duration: 0,
    mining_claimed_at: 0,
    setGameStats: (stats) => set(stats),
    addEnergy: (amount: number) => {
        set((state) => ({
            energy_balance: Math.min(state.energy_balance + amount, state.max_energy),
        }));
    },
    startMining: async () => {
        try {
            const { data } = await axios.get('/mining/start');
            set(state => ({
                ...state,
                mining_balance: data.mining_balance,
                mining_max_points: data.mining_speed * data.mining_duration,
                mining_speed: data.mining_speed,
                mining_duration: data.mining_duration,
                mining_claimed_at: data.mining_claimed_at,
            }));
            console.log(data);
        } catch (error) {
            console.error('Failed to start mining:', error);
            alert('Failed to start mining. Please try again later.');
        }
    }
}));

export default useGameStatsStore;
