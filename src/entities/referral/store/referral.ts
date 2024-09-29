import { create } from 'zustand';
import { ReferalInfoCard } from '../model/referral.types';
import fetchReferrals from '../api/fetchReferrals';
import fetchReferralsInfo from '../api/fetchReferralsInfo';

interface ReferalState {
    level: string,
    ref_count: number,
    next_level: number,
    ref_percent: number,
    balance: number,
    claim_time: number,
    started_time: number,
    info: ReferalInfoCard[],
    fetchReferrals: () => void,
    fetchReferralsInfo: () => void
}

export const useReferralStore = create<ReferalState>((set, _) => ({
    info: [],
    level: '',
    ref_count: 0,
    next_level: 0,
    ref_percent: 0,
    balance: 0,
    claim_time: 0,
    started_time: 0,
    fetchReferrals: async () => {
        const data = await fetchReferrals();
        set({ ...data })
    },
    fetchReferralsInfo: async () => {
        const data = await fetchReferralsInfo();
        set({ info: data })
    },
}));

export default useReferralStore;
