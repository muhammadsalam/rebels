import { create } from 'zustand';
import { ReferalInfoCard } from '../model/referral.types';
import fetchReferrals from '../api/fetchReferrals';
import fetchReferralsInfo from '../api/fetchReferralsInfo';
import { tgApp } from 'shared/libs/utils';

interface ReferalState {
    level: string,
    prev_level: string,
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

export const useReferralStore = create<ReferalState>((set, get) => ({
    info: [],
    level: '',
    prev_level: '',
    ref_count: 0,
    next_level: 0,
    ref_percent: 0,
    balance: 0,
    claim_time: 0,
    started_time: 0,
    fetchReferrals: async () => {
        const data = await fetchReferrals();
        set({ ...data });

        console.log(get().prev_level, data.level);
        if (get().prev_level.toLowerCase() !== data.level.toLowerCase()) {
            if (parseFloat(tgApp.version) > 6.9) {
                tgApp.CloudStorage.setItem("ref_level", data.level);
            } else {
                localStorage.setItem("ref_level", data.level);
            }
        }

        return new Promise<ReferalState>((resolve) => {
            resolve({ ...data });
        });
    },
    fetchReferralsInfo: async () => {
        const data = await fetchReferralsInfo();
        set({ info: data })
    },
}));

export default useReferralStore;
