import useGameStatsStore from "entities/gameStats";
import useHeroStore, { Card } from "entities/heroes";
import { axios } from "shared/libs";

export default async function (tempTeam: Card[]) {
    try {
        const prevTeam = useHeroStore.getState().team;

        const deleted = prevTeam.filter(item => tempTeam.find(card => card.id === item.id) === undefined);
        const added = tempTeam.filter(item => prevTeam.find(card => card.id === item.id) === undefined);

        const payload = deleted.reduce<{ hero_id: number, new_hero_id: number }[]>((items, item, index) => {
            items.push({ hero_id: item.id, new_hero_id: added[index].id });
            return items;
        }, []);

        const { status, data } = await axios.post('/user/heroes/change', payload);

        if (status !== 200) {
            alert('Something went wrong. Please try again later!');
        }

        useHeroStore.setState({ team: data.team.filter((item: Card) => item.changed), cards: data.team });
        useGameStatsStore.setState({ critical_chance: data.critical_chance, damage: data.damage, energy_usage: data.energy_usage })
    } catch (e) {
        console.log(e);
        alert(e);
    }

}