import { tgApp, axios } from 'shared/libs';
import { create } from 'zustand';

interface UserState {
    token: string | null;
    fetchToken: () => void,
}

//заменить _ на set
const useUserStore = create<UserState>((_) => ({
    token: null,
    fetchToken: async () => {
        const response = await axios.post('/auth', { initdata: import.meta.env.VITE_INITDATA || tgApp.initData });
        console.log(response.data);
    }
}));

export default useUserStore;
