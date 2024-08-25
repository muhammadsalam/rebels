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
        const team = data.heroes.filter((item: Card) => item.position !== null).concat(
            (new Array(5) as Card[]).fill({
                photo: '',
                id: 0,
                level: 0,
                count: 0,
                knowledge_step: 0,
                loyalty_step: 0,
                influence_step: 0,
                position: null,
                influence: 0,
                knowledge: 0,
                loyalty: 0,
                name: "",
                rarity: "Common",
                upgrade_price: 0,
            })
        ).slice(0, 5).map((item: Card, index: number) => {
            return { ...item, position: item.position ?? index }
        });

        useHeroStore.setState({
            cards: data.heroes, team
        });
        useUserStore.setState({ balance: data.balance });

        return { upgradedCard: data.result, upgraded_team: team };
    } catch (e) {
        alert('Something went wrong. Please try again later!');
        return null;
    }
}