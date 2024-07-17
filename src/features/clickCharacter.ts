import useGameStatsStore from "entities/gameStats";
import useTapsCounterStore from "entities/tapsCounter";
import useUserStore from "entities/user";
import useVillainStore from "entities/villain";

export default function (damage: number, isCritical: boolean) {
    const { energy_balance, energy_usage } = useGameStatsStore.getState();
    const { balance } = useUserStore.getState();
    const { level, current_health } = useVillainStore.getState();
    const { addTap } = useTapsCounterStore.getState();

    const newHealth = current_health - damage;
    const newEnergy = energy_balance - energy_usage;
    const newBalance = balance + damage;

    if (newEnergy < 0) return false;

    useGameStatsStore.setState({ energy_balance: newEnergy });
    useUserStore.setState({ balance: newBalance })

    addTap(isCritical)

    if (newHealth < 0) {
        useVillainStore.setState({ level: level + 1, current_health: 25000 });
        return true;
    }

    useVillainStore.setState({ current_health: newHealth });
    return true;
}