import { useHeroStore, Card } from "entities/heroes";
import { axios, showAlert } from "shared/libs/utils";

export const fetchHeroes = async () => {
    try {
        const { status, data } = await axios.get('/user/heroes');

        if (status !== 200) throw new Error('something went wrong');

        const team = data.heroes.filter((item: Card) => item.position !== null);

        useHeroStore.setState({
            cards: data.heroes,
            team: team.concat(
                (new Array(5) as Card[]).fill({
                    base_damage: 0,
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
            }),
            team_skills: data.team_values
        })

        return team;
    } catch (err) {
        showAlert('Something went wrong. Please try again later! ' + err);
    }
}