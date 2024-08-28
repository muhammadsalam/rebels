import { axios, showAlert } from 'shared/libs/utils';
import { create } from 'zustand';

export type ReferalInfoCard = {
    reward: number,
    level: string,
    referrals: number,
    percent: number
};

interface ReferalState {
    level: string,
    ref_count: number,
    next_level: number,
    ref_percent: number,
    balance: number,
    claim_time: number,
    started_time: number,
    info: ReferalInfoCard[],
    fetchReferals: () => void,
    fetchReferalsInfo: () => void
}

const useReferalStore = create<ReferalState>((set, _) => ({
    info: [],
    level: '',
    ref_count: 0,
    next_level: 0,
    ref_percent: 0,
    balance: 0,
    claim_time: 0,
    started_time: 0,
    fetchReferals: async () => {
        try {
            const { status, data } = await axios.get('/user/referal/stats');

            if (status !== 200) {
                throw new Error('something went wrong');
            }

            set({ ...data })

        } catch (error) {
            showAlert('Something went wrong. Please try again later. ' + error);
        }
    },
    fetchReferalsInfo: async () => {
        try {
            const { status, data } = await axios.get('/user/referal');

            if (status !== 200) {
                throw new Error('Something went wrong when refferals fetching.');
            }

            set({ info: data })
        } catch (error) {
            showAlert('Something went wrong. Please try again later. ' + error);
        }
    },
}));

export default useReferalStore;
