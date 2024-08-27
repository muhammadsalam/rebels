import { useGameStatsStore } from "../model/gameStats";

export const addEnergy = () => {
    useGameStatsStore.setState((state) => ({
        energy_balance: Math.min(
            state.energy_balance + useGameStatsStore.getState().energy_update,
            state.max_energy
        ),
    }));
};
