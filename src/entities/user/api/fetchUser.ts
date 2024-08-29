import { AxiosResponse } from "axios";
import useChestsStore from "entities/chests";
import { useHeroStore } from "entities/heroes";
import useQuestsStore, { Quest } from "entities/quests";
import useReferalStore from "entities/referal";
import { useUserStore, useGameStatsStore } from "entities/user";
import useVillainStore from "entities/villain";
import { axios, showAlert } from "shared/libs/utils";

type TUser = {
    id: number,
    level: number,
    telegram_id: number,
    username: string,
    first_name: string,
    last_name: string,
    balance: number,
    damage: number,
    critical_chance: number,
    energy_balance: number,
    energy_usage: number,
    energy_update: number,
    max_energy: number,
    mining_balance: number,
    mining_speed: number,
    mining_duration: number,
    mining_claimed_at: number
}

type TProfile = {
    level_name: string,
    start_value: number,
    total_value: number,
    next_level_value: number,
    total_hero_values: {
        knowledge: number,
        loyalty: number,
        influence: number
    }
}

type TVillain = {
    id: number,
    health: number,
    photo: string,
    name: string,
    level: number,
    current_health: number,
    description: string
}

type TTeamValue = {
    knowledge: number,
    loyalty: number,
    influence: number
}

type THero = {
    name: string,
    photo: string,
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legend",
    id: number,
    count: number,
    level: number,
    knowledge: number,
    loyalty: number,
    influence: number,
    knowledge_step: number,
    loyalty_step: number,
    influence_step: number,
    upgrade_price: number,
    position: null | number;
}

type TTask = {
    id: number,
    name: string,
    reward: number,
    url: string,
    status: "Start" | "Check" | "Claim" | "Done";
    attemps: number;
    scenario: 1 | 2 | 3;
}

type TBoxRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

type TBox = {
    id: number,
    level: number,
    price: number,
    rarity: TBoxRarity,
    garanted: TBoxRarity | null,
    required_level: number,
    reward: {
        percent: number,
        rarity: TBoxRarity[]
    }[]
}

type TReferalStats = {
    level: string,
    ref_count: number,
    next_level: number,
    ref_percent: number,
    balance: number,
    claim_time: number
}

type TReferalInfo = {
    reward: number,
    level: string,
    referrals: number,
    percent: number
}[]

interface TUserResponse {
    user: TUser,
    profile: TProfile,
    villain: TVillain,
    team_values: TTeamValue,
    heroes: THero[],
    task: TTask[],
    boxes: TBox[],
    refferal_info: TReferalInfo,
    refferal_stats: TReferalStats
}

export const fetchUser = async () => {
    try {
        const { data, status, }: AxiosResponse<TUserResponse> = await axios.get("/user");

        if (status !== 200) return false;

        const game_stats = {
            damage: data.user.damage,
            critical_chance: data.user.critical_chance,
            energy_balance: data.user.energy_balance,
            energy_update: data.user.energy_update,
            energy_usage: data.user.energy_usage,
            max_energy: data.user.max_energy,
            mining_balance: data.user.mining_balance,
            mining_speed: data.user.mining_speed,
            mining_max_points: data.user.mining_duration * data.user.mining_speed,
            mining_duration: data.user.mining_duration,
            mining_claimed_at: data.user.mining_claimed_at,

            total_value: data.profile.total_value,
            total_hero_values: data.profile.total_hero_values,
            start_level_value: data.profile.start_value,
            next_level_value: data.profile.next_level_value,
        };

        useUserStore.setState({
            id: data.user.id,
            balance: data.user.balance,
            uci_id: data.user.telegram_id,
            level: data.user.level,
            level_name: data.profile.level_name,
            username: data.user.username
        });

        useGameStatsStore.setState(game_stats);

        useVillainStore.setState({
            ...data.villain,
            image: data.villain.photo,
            current_image: data.villain.photo,
            current_name: data.villain.name,
            current_level: data.villain.level,
            current_description: data.villain.description,
        });

        const team = data.heroes.filter((item: THero) => item.position !== null);

        useHeroStore.setState({
            cards: data.heroes,
            team: team.concat(
                (new Array(5) as THero[]).fill({
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
            ).slice(0, 5).map((item: THero, index: number) => {
                return { ...item, position: item.position ?? index }
            }),
            team_skills: data.team_values
        });

        useChestsStore.setState({ chests: data.boxes });

        useQuestsStore.setState({
            quests: data.task.map((item: Quest) => {
                let scenario: 1 | 2 | 3;
                const randomNumber = Math.floor(Math.random() * 100) + 1;

                if (randomNumber <= 20) {
                    scenario = 1;
                } else if (randomNumber <= 60) {
                    scenario = 2;
                } else {
                    scenario = 3;
                }

                return { ...item, attemps: 1, scenario }
            })
        });

        useReferalStore.setState({
            info: data.refferal_info,
            ...data.refferal_stats
        })

        return true;
    } catch (error) {
        showAlert('Failed to fetch user. Please try again later.' + error);
        return false;
    }
};
