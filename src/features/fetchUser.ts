import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import useVillainStore from "entities/villain";
import { axios } from "shared/libs";

export default async () => {
    try {
        const { data: { user, villain }, status } = await axios.get('/user');

        if (status !== 200) return false

        const game_stats = {
            damage: user.damage,
            critical_chance: user.critical_chance,
            energy_balance: user.energy_balance,
            energy_usage: user.energy_usage,
            max_energy: user.max_energy,
            mining_balance: user.mining_balance,
            mining_speed: user.mining_speed,
            mining_max_points: user.mining_duration * user.mining_speed,
            mining_duration: user.mining_duration,
            mining_claimed_at: user.mining_claimed_at,
        };

        useUserStore.setState({ id: user.id, balance: user.balance, username: user.username });
        useGameStatsStore.setState(game_stats);
        useVillainStore.setState({ ...villain, current_health: 100 });

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}