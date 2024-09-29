import { useTapsCounterStore, useGameStatsStore, useUserStore } from "entities/user";
import { useVillainStore } from "entities/villain";
import { axios, showAlert } from "shared/libs/utils";

export default async function () {
    const { taps, critical_taps, seed } = useTapsCounterStore.getState();
    const { id } = useUserStore.getState();

    if (taps === 0 && critical_taps === 0) return;
    if (+new Date() - 2000 <= seed) {
        console.log('bad seed');
        return;
    }
    const item = {
        id,
        taps,
        critical_taps,
        seed
    }

    try {
        useTapsCounterStore.setState({ taps: 0, critical_taps: 0, seed: +new Date() });
        const { status, data } = await axios.post('/tap', item);

        if (status !== 200) throw new Error('Something is wrong, try again later.')

        if (data.is_new_level) {
            const game_stats = {
                damage: data.user.damage,
                critical_chance: data.user.critical_chance,
                energy_balance: data.user.energy_balance,
                energy_usage: data.user.energy_usage,
            };

            useUserStore.setState({ balance: data.user.balance })
            useGameStatsStore.setState(game_stats)
            useVillainStore.setState({ ...data.villain, image: data.villain.photo });
        }

    } catch (error) {
        showAlert('Something is wrong when taps sending. ' + error);
    }
}