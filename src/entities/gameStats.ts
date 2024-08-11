import { axios } from 'shared/libs';
import { create } from 'zustand';

interface GameStatsState {
    total_hero_values: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };

    isProfileLoading: boolean;
    total_value: number;
    next_level_value: number;
    damage: number;
    critical_chance: number;

    energy_balance: number;
    energy_update: number;
    energy_usage: number;
    max_energy: number;
    addEnergy: () => void;

    mining_balance: number;
    mining_speed: number;
    mining_max_points: number;
    mining_duration: number;
    mining_claimed_at: number;
    startMining: () => void;

    setGameStats: (stats: Partial<GameStatsState>) => void;
}

const useGameStatsStore = create<GameStatsState>((set, get) => ({
    isProfileLoading: false,
    total_value: 0,
    next_level_value: 0,
    total_hero_values: {
        knowledge: 0,
        loyalty: 0,
        influence: 0
    },
    damage: 0,
    critical_chance: 0,

    energy_balance: 0,
    energy_update: 0,
    energy_usage: 0,
    max_energy: 0,

    mining_balance: 0,
    mining_speed: 0,
    mining_max_points: 0,
    mining_duration: 0,
    mining_claimed_at: 0,
    setGameStats: (stats) => set(stats),
    addEnergy: () => {
        set((state) => ({
            energy_balance: Math.min(state.energy_balance + get().energy_update, state.max_energy),
        })
        );
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
