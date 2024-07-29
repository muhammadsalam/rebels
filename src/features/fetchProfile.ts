import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async () => {
    try {
        const { data, status } = await axios.get('/user/profile');

        if (status !== 200) return;

        useUserStore.setState({ level: data.level });
        useGameStatsStore.setState({ total_value: data.total_value, total_hero_values: data.total_hero_values });

    } catch (err) {
        console.error(err);
    }
}