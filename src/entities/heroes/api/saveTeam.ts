import { useGameStatsStore } from "entities/user/";
import { useHeroStore, Card } from "entities/heroes";
import { axios, showAlert } from "shared/libs/utils";

export const saveTeam = async function (tempTeam: Card[]) {
    try {
        const prevTeam = useHeroStore.getState().team;

        const payload = tempTeam.reduce<{ hero_id: number, position: number | null }[]>((items, item) => {
            const oldCard = prevTeam.find(card => card.position === item.position)

            if (item.position !== null && tempTeam.find(card => card.id === oldCard?.id && card.position === item.position) === undefined) {
                items.push({ hero_id: item.id, position: item.position });
            }

            return items;
        }, [])

        const { status, data } = await axios.post('/user/heroes/change', payload);

        if (status !== 200) {
            throw new Error('Something went wrong. Please try again later!');
        }

        useHeroStore.setState({ cards: data.team, team_skills: data.team_values });
        useHeroStore.getState().teamFromCards();
        useGameStatsStore.setState({
            critical_chance: data.critical_chance,
            damage: data.damage,
            energy_usage: data.energy_usage
        })
    } catch (error) {
        showAlert('Something went wrong. Please try again later! ' + error);
    }

}