import { useTapsCounterStore, useGameStatsStore, useUserStore } from "entities/user";
import { useVillainStore } from "entities/villain";

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

    // if ("vibrate" in navigator && useUserStore.getState().settings.sounds) navigator.vibrate(5);
    // if ('impactOccured' in tgApp.HapticFeedback) {
    //     tgApp.HapticFeedback.impactOccured('medium')
    // } else {
    const vibrateSeconds = isCritical ? 40 : 20;
    if ("vibrate" in navigator) navigator.vibrate(vibrateSeconds);
    else if ("oVibrate" in navigator) (navigator as any).oVibrate(vibrateSeconds);
    else if ("mozVibrate" in navigator) (navigator as any).mozVibrate(vibrateSeconds);
    else if ("webkitVibrate" in navigator) (navigator as any).webkitVibrate(vibrateSeconds);
    // }

    if (newHealth <= 0) {
        useVillainStore.setState({ current_health: 0, wasted: true, new_level_reward: health / 2 });
        return true;
    }

    useVillainStore.setState({ current_health: newHealth });
    return true;
}