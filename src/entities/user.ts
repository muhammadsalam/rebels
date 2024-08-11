import { tgApp, axios } from 'shared/libs';
import { create } from 'zustand';

interface UserState {
    settings: {
        vibro: boolean;
    };
    token: string | null;
    id: number | null;
    balance: number;
    username: string;
    level: number;
    level_name: string;
    uci_id: number,
    fetchToken: () => Promise<boolean>,
}

const useUserStore = create<UserState>((set) => ({
    settings: {
        vibro: true,
    },
    token: null,
    id: null,
    balance: 0,
    username: '',
    level: 0,
    level_name: '',
    uci_id: 0,
    fetchToken: async () => {
        try {
            const response = await axios.post('/auth', { initdata: import.meta.env.VITE_INITDATA || tgApp.initData });
            const { token } = response.data;
            set({ token });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
}));

export default useUserStore;
