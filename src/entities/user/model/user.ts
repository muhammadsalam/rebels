import { create } from 'zustand';

export interface UserState {
    settings: {
        sounds: boolean;
    };
    token: string | null;
    id: number | null;
    balance: number;
    username: string;
    name: string,
    level: number;
    level_name: string;
    uci_id: number,
}

export const useUserStore = create<UserState>(() => ({
    settings: {
        sounds: true,
    },
    token: null,
    id: null,
    balance: 0,
    username: '',
    name: '',
    level: 0,
    level_name: '',
    uci_id: 0,
}));