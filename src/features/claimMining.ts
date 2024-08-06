import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async function () {
    try {
        const { status, data } = await axios.post('/mining/claim');

        if (status !== 200) {
            throw new Error('status code: ' + status)
        }

        const balance = useUserStore.getState().balance;

        useGameStatsStore.setState({
            mining_balance: data.mining_balance,
            mining_max_points: data.mining_max_points,
            mining_duration: data.mining_duration,
            mining_claimed_at: data.mining_claimed_at,
        })

        useUserStore.setState({ balance: balance + data.mining_max_points });
    } catch (error) {
        alert('Failed to claim mining. Please try again later')
        console.error('Failed to claim mining:', error);
    }
}