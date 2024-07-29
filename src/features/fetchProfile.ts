import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async () => {
    useGameStatsStore.setState({ isProfileLoading: true });
    try {
        const { data, status } = await axios.get('/user/profile');

        if (status !== 200) return;

        useUserStore.setState({ level: data.level, level_name: data.level_name });
        useGameStatsStore.setState({ total_value: data.total_value, total_hero_values: data.total_hero_values, next_level_value: data.next_level_value });
    } catch (err) {
        console.error(err);
    }
    useGameStatsStore.setState({ isProfileLoading: false });
}