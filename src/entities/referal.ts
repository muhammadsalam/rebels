import { axios } from 'shared/libs';
import { create } from 'zustand';

interface ReferalState {
    level: number,
    ref_count: number,
    next_level: number,
    ref_percent: number,
    balance: number,
    claim_time: number,
    fetchReferals: () => void
}

const useReferalStore = create<ReferalState>((set, _) => ({
    level: 0,
    ref_count: 0,
    next_level: 0,
    ref_percent: 0,
    balance: 0,
    claim_time: 0,
    fetchReferals: async () => {
        const { status, data } = await axios.get('/user/referal/stats');

        if (status !== 200) {
            return alert('something went wrong');
        }

        set({ ...data })
    }
}));

export default useReferalStore;
