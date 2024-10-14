import { AxiosResponse } from "axios";
import { useChestsStore } from "entities/chests";
import { useHeroStore } from "entities/heroes";
import { Quest, QuestType, useQuestsStore } from "entities/quests";
import { useReferralStore } from "entities/referral";
import { useUserStore, useGameStatsStore } from "entities/user";
import { useVillainStore } from "entities/villain";
import { axios, preloadImage, showAlert, tgApp } from "shared/libs/utils";

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
    mining_claimed_at: number,
    daily_avaible_at: number,
}

type TProfile = {
    level: number;
    level_name: string,
    start_value: number,
    next_level_value: number | null,
    total_value: number,
    total_values: {
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
    base_damage: number,
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
    type: QuestType;
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

type TMaxValues = {
    team: {
        knowledge: number,
        loyalty: number,
        influence: number
    },
    total: {
        knowledge: number,
        loyalty: number,
        influence: number
    };
}

interface TUserResponse {
    max_values: TMaxValues,
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

export const fetchUser: (retry?: number) => Promise<boolean> = async (retry = 0) => {
    const MAX_RETRIES = 3;

    try {
        const { data, status, }: AxiosResponse<TUserResponse> = await axios.get("/user");

        if (status !== 200) return false;

        preloadImage(`${import.meta.env.VITE_API_BACK}/villain/${data.villain.photo}`);

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
            daily_available_at: data.user.daily_avaible_at,

            max_total_values: data.max_values.total,
            total_value: data.profile.total_value,
            total_values: data.profile.total_values,
            start_level_value: data.profile.start_value,
            next_level_value: data.profile.next_level_value,
        };

        useUserStore.setState({
            id: data.user.id,
            balance: data.user.balance,
            uci_id: data.user.telegram_id,
            prev_level: data.profile.level,
            level: data.profile.level,
            level_name: data.profile.level_name,
            username: data.user.username,
            name: data.user.username || data.user.first_name,
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

        useHeroStore.setState({
            cards: data.heroes,
            team_skills: data.team_values,
            max_team_skills: data.max_values.team
        });

        useHeroStore.getState().teamFromCards();

        useChestsStore.setState({ chests: data.boxes });

        useQuestsStore.setState({
            quests: data.task.map((item: Quest) => {
                let scenario: 1 | 2 | 3;
                const randomNumber = Math.floor(Math.random() * 100) + 1;

                if (item.type === "TELEGRAM") {
                    return { ...item, attemps: 1, scenario: 1 }
                }

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

        if (useReferralStore.getState().prev_level === '') {
            if (parseFloat(tgApp.version) > 6.9) {
                tgApp.CloudStorage.setItem("ref_level", data.refferal_stats.level);
            } else {
                localStorage.setItem("ref_level", data.refferal_stats.level);
            }
        }

        useReferralStore.setState({
            prev_level: useReferralStore.getState().prev_level === '' ? data.refferal_stats.level : useReferralStore.getState().prev_level,
            info: data.refferal_info,
            ...data.refferal_stats
        })

        return true;
    } catch (error: any) {
        if (error.code === "ERR_NETWORK" && error.message.includes("Network Error") && retry < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return fetchUser(retry + 1);
        } else {
            showAlert('Failed to fetch user.' + error);
            return false;
        }
    }
};

