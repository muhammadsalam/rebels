import { axios, showAlert } from "shared/libs/utils";
import { useGameStatsStore } from "../model/gameStats";

export const startMining = async () => {
    try {
        const { data, status } = await axios.get('/mining/start');

        if (status !== 200) {
            return showAlert('Failed to start mining. Please try again later.');
        }

        useGameStatsStore.setState(state => ({
            ...state,
            mining_balance: data.mining_balance,
            mining_max_points: data.mining_speed * data.mining_duration,
            mining_speed: data.mining_speed,
            mining_duration: data.mining_duration,
            mining_claimed_at: data.mining_claimed_at,
        }));
    } catch (error) {
        showAlert('Failed to start mining. Please try again later.' + error);
    }
}