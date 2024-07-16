import useGameStatsStore from "entities/gameStats";
import useTapsCounterStore from "entities/tapsCounter";
import useUserStore from "entities/user";
import useVillainStore from "entities/villain";

export default function (damage: number) {
    const { energy_balance, energy_usage } = useGameStatsStore.getState();
    const { balance } = useUserStore.getState();

    const { level, current_health } = useVillainStore.getState();

    const newHealth = current_health - damage;
    const newEnergy = energy_balance - energy_usage;
    const newBalance = balance + damage;

    if (newEnergy < 0) return false;

    useGameStatsStore.setState({ energy_balance: newEnergy });
    useTapsCounterStore.setState({ taps: 0, critical_taps: 0 });
    useUserStore.setState({ balance: newBalance })

    const addTap = useTapsCounterStore.getState().addTap;

    if (newHealth < 0) {
        useVillainStore.setState({ level: level + 1, current_health: 25000 });
        addTap(true)
        return true;
    }

    useVillainStore.setState({ current_health: newHealth });
    addTap(true)

    return true;
}