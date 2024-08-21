import useGameStatsStore from "entities/gameStats";
import useHeroStore, { Card } from "entities/heroes";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async function (hero_id: number) {
    try {
        const { status, data } = await axios.post(`/user/heroes/upgrade?hero_id=${hero_id}`)

        if (status !== 200) {
            alert('Something went wrong. Please try again later!');
            return null;
        }

        const game_stats = {
            damage: data.damage,
            energy_usage: data.energy_usage,
            max_energy: data.max_energy,
            critical_chance: data.critical_chance,
            energy_update: data.energy_update,
        }

        useGameStatsStore.setState(game_stats);
        useHeroStore.setState({ cards: data.heroes, team: data.heroes.filter((item: Card) => item.changed) });
        useUserStore.setState({ balance: data.balance });

        return data.result;
    } catch (e) {
        alert('Something went wrong. Please try again later!');
        return null;
    }
}