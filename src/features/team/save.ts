import useGameStatsStore from "entities/gameStats";
import useHeroStore, { Card } from "entities/heroes";
import { axios } from "shared/libs";

export default async function (tempTeam: Card[]) {
    try {
        const prevTeam = useHeroStore.getState().team;

        const payload = tempTeam.reduce<{ hero_id: number, new_hero_id: number }[]>((newTeam, item, index) => {
            if (item.id !== prevTeam[index]?.id) {
                newTeam.push({
                    hero_id: prevTeam[index]?.id as number, new_hero_id: item.id
                });
            }

            return newTeam;
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