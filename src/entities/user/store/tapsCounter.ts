import { create } from 'zustand';

export interface TapsState {
    taps: number;
    critical_taps: number;
    seed: number;
    addTap: (isCritical: boolean) => void;
}

export const useTapsCounterStore = create<TapsState>((set) => ({
    taps: 0,
    critical_taps: 0,
    seed: +new Date(),
    addTap: (isCritical) => {
        set(state => (
            {
                taps: state.taps + 1,
                critical_taps: isCritical ? state.critical_taps + 1 : state.critical_taps
            }
        ));
    },
}));