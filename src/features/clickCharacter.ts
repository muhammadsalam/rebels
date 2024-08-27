import { useTapsCounterStore, useGameStatsStore, useUserStore } from "entities/user";
import useVillainStore from "entities/villain";

export default function (damage: number, isCritical: boolean) {
    const { energy_balance, energy_usage } = useGameStatsStore.getState();
    const { balance } = useUserStore.getState();
    const { current_health, wasted, health } = useVillainStore.getState();
    const addTap = useTapsCounterStore.getState().addTap;

    const newHealth = current_health - damage;
    const newEnergy = energy_balance - energy_usage;
    const newBalance = balance + damage;

    if (newEnergy < 0 || wasted) return false;

    useGameStatsStore.setState({ energy_balance: newEnergy });
    useUserStore.setState({ balance: newBalance })

    addTap(isCritical)

    if ("vibrate" in navigator && useUserStore.getState().settings.vibro) navigator.vibrate(5);

    if (newHealth <= 0) {
        useVillainStore.setState({ current_health: 0, wasted: true, new_level_reward: health / 2 });
        return true;
    }

    useVillainStore.setState({ current_health: newHealth });
    return true;
}