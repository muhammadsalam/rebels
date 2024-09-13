import { useGameStatsStore } from "entities/user";
import { useHeroStore } from "entities/heroes";
import { useUserStore } from "entities/user";
import { axios, showAlert } from "shared/libs/utils";

export const upgradeHero = async function (hero_id: number) {
    try {
        const { status, data } = await axios.post(`/user/heroes/upgrade?hero_id=${hero_id}`)

        if (status !== 200) {
            throw new Error('Something went wrong. Please try again later!');
        }

        const game_stats = {
            damage: data.damage,
            energy_usage: data.energy_usage,
            max_energy: data.max_energy,
            critical_chance: data.critical_chance,
            energy_update: data.energy_update,

            total_value: data.profile.total_value,
            total_values: data.profile.total_values,
            start_level_value: data.profile.start_value,
            next_level_value: data.profile.next_level_value,
        }

        useGameStatsStore.setState(game_stats);

        useHeroStore.setState({ cards: data.heroes });
        useHeroStore.getState().teamFromCards();
        useUserStore.setState({
            balance: data.balance,
            level_name: data.profile.level_name
        });

        setTimeout(() => {
            useUserStore.setState({
                level: data.profile.level
            })
        }, useUserStore.getState().level !== data.profile.level ? 2000 : 0);

        return { upgradedCard: data.result, upgraded_team: useHeroStore.getState().team };
    } catch (error) {
        showAlert('Something went wrong. Please try again later! ' + error);
        return null;
    }
}