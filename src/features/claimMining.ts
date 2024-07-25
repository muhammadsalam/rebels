import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async function () {
    try {
        const { data } = await axios.post('/mining/claim');
        const balance = useUserStore.getState().balance;
        useGameStatsStore.setState({
            mining_balance: data.mining_balance,
            mining_max_points: data.mining_max_points,
            mining_duration: data.mining_duration,
            mining_claimed_at: data.mining_claimed_at,
        })
        console.log(data.balance);
        useUserStore.setState({ balance: balance + data.mining_max_points });
    } catch (error) {
        console.error('Failed to claim mining:', error);
    }
}