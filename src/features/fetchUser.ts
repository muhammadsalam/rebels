import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import useVillainStore from "entities/villain";
import { axios } from "shared/libs";

export default async () => {
    try {
        const { data: { user, villain } } = await axios.get('/user');

        useUserStore.setState({ id: user.id, balance: user.balance });

        const game_stats = {
            damage: user.damage,
            critical_chance: user.critical_chance,
            energy_balance: user.energy_balance,
            energy_usage: user.energy_usage,
            max_energy: user.max_energy,
            mining_balance: user.mining_balance,
            mining_max_points: user.mining_max_points,
            mining_duration: user.mining_duration,
            mining_claimed_at: user.mining_claimed_at,
        };

        useGameStatsStore.setState(game_stats);
        useVillainStore.setState(villain);
    } catch (err) {
        console.error(err);
    }
}