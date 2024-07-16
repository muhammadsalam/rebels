import { create } from 'zustand';
import useVillainStore from './villain';

interface GameStatsState {
    balance: number;
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
    clickCharacter: (isCritical: boolean, damage: number) => boolean;
    claim: () => void;
}

const useGameStatsStore = create<GameStatsState>((set, get) => {

    const setVillain = useVillainStore.getState().setVillain;
    let villainHealth = useVillainStore.getState().current_health;
    let villainLevel = useVillainStore.getState().level;

    useVillainStore.subscribe((state) => {
        villainHealth = state.current_health;
        villainLevel = state.level;
    })

    return {
        balance: 0,
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
        clickCharacter: (_: boolean, damage: number) => {
            const { energy_balance, energy_usage, balance } = get();
            const newHealth = villainHealth - damage;
            const newEnergy = energy_balance - energy_usage;
            const newBalance = balance + damage;

            if (newEnergy < 0) return false;

            set({ energy_balance: newEnergy, balance: newBalance });

            if (newHealth < 0) {
                setVillain({ level: villainLevel + 1, current_health: 25000 });
                return true;
            }

            setVillain({ current_health: newHealth });

            return true;
        },
        claim: () => {

        }
    }
});

export default useGameStatsStore;
