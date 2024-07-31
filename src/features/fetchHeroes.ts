import useHeroStore from "entities/heroes";
import { axios } from "shared/libs";

export default async () => {
    try {
        const { status, data } = await axios.get('/user/heroes');

        if (status !== 200) return;

        useHeroStore.setState({
            cards: data.heroes,
            team: data.changed,
            team_skills: data.team_values
        })
        return data.changed;
    } catch (err) {
        console.error(err);
    }
}