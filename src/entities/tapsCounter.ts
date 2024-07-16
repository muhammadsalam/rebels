import { create } from 'zustand';

interface TapsState {
    taps: number;
    critical_taps: number;
    addTap: (isCritical: boolean) => void;
}

const useTapsCounterStore = create<TapsState>((set, get) => ({
    taps: 0,
    critical_taps: 0,
    addTap(_) {
        const { taps } = get();
        set({ taps: taps + 1 });
        // if (isCritical) {
        // } else {
        //     this.taps++;
        // }
    },
}));

export default useTapsCounterStore;
