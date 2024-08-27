import { useGameStatsStore, useUserStore } from "entities/user";
import { axios, showAlert } from "shared/libs/utils";

export const claimMining = async function () {
    try {
        const { status, data } = await axios.post('/mining/claim');

        if (status !== 200) {
            throw new Error('status code: ' + status)
        }

        useUserStore.setState({ balance: data.balance });

        useGameStatsStore.setState({
            mining_balance: 0,
            mining_claimed_at: 0,
            mining_duration: 0,
        })

    } catch (error) {
        showAlert('Failed to claim mining. Please try again later')
        console.error('Failed to claim mining:', error);
    }
}