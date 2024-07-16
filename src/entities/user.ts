import { tgApp, axios } from 'shared/libs';
import { create } from 'zustand';

interface UserState {
    token: string | null;
    id: number | null;
    balance: number;
    fetchToken: () => Promise<boolean>,
}

const useUserStore = create<UserState>((set) => ({
    token: null,
    id: null,
    balance: 0,
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
