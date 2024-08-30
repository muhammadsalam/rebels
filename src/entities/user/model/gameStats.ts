import { create } from 'zustand';

export interface GameStatsState {
    total_values: {
        knowledge: number;
        loyalty: number;
        influence: number;
    };

    isProfileLoading: boolean;
    total_value: number;
    start_level_value: number;
    next_level_value: number;
    damage: number;
    critical_chance: number;

    energy_balance: number;
    energy_update: number;
    energy_usage: number;
    max_energy: number;

    mining_balance: number;
    mining_speed: number;
    mining_max_points: number;
    mining_duration: number;
    mining_claimed_at: number;
}

export const useGameStatsStore = create<GameStatsState>(() => ({
    isProfileLoading: false,
    total_value: 0,
    start_level_value: 0,
    next_level_value: 0,
    total_values: {
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
}));