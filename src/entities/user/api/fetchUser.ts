import { useUserStore, useGameStatsStore } from "entities/user";
import useVillainStore from "entities/villain";
import { axios, showAlert } from "shared/libs/utils";

export const fetchUser = async () => {
    try {
        const {
            data: { user, villain },
            status,
        } = await axios.get("/user");

        if (status !== 200) return false;

        const game_stats = {
            damage: user.damage,
            critical_chance: user.critical_chance,
            energy_balance: user.energy_balance,
            energy_update: user.energy_update,
            energy_usage: user.energy_usage,
            max_energy: user.max_energy,
            mining_balance: user.mining_balance,
            mining_speed: user.mining_speed,
            mining_max_points: user.mining_duration * user.mining_speed,
            mining_duration: user.mining_duration,
            mining_claimed_at: user.mining_claimed_at,
        };

        useUserStore.setState({
            id: user.id,
            balance: user.balance,
            uci_id: user.telegram_id,
            level: user.level,
        });
        useGameStatsStore.setState(game_stats);
        useVillainStore.setState({
            ...villain,
            image: villain.photo,
            current_image: villain.photo,
            current_name: villain.name,
            current_level: villain.level,
            current_description: villain.description,
        });

        return true;
    } catch (error) {
        showAlert('Failed to fetch user. Please try again later.' + error);
        return false;
    }
};
