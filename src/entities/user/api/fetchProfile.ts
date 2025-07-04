import { useUserStore, useGameStatsStore } from "entities/user";
import { axios } from "shared/libs/utils";

export const fetchProfile = async () => {
    useGameStatsStore.setState({ isProfileLoading: true });
    try {
        const { data, status } = await axios.get('/user/profile');

        if (status !== 200) return;

        useUserStore.setState({ level: data.level, level_name: data.level_name, username: data.username });
        useGameStatsStore.setState({ total_value: data.total_value, total_values: data.total_values, next_level_value: data.next_level_value, start_level_value: data.start_value });
    } catch (err) {
        console.error(err);
    }
    useGameStatsStore.setState({ isProfileLoading: false });
}