import { tgApp, axios } from 'shared/libs';
import { create } from 'zustand';
import useGameStatsStore from './gameStats';
import useVillainStore from './villain';

interface UserState {
    token: string | null;
    id: number | null;
    fetchToken: () => void,
    fetchUser: () => void,
    setUser: (user: Partial<UserState>) => void;
}

const useUserStore = create<UserState>((set, get) => {
    const setGameStats = useGameStatsStore.getState().setGameStats;
    const setVillain = useVillainStore.getState().setVillain;
    return {
        token: null,
        id: null,
        setUser: (user) => set(user),
        fetchToken: async () => {
            try {
                const response = await axios.post('/auth', { initdata: import.meta.env.VITE_INITDATA || tgApp.initData });
                const { token } = response.data;
                set({ token });
                get().fetchUser();

            } catch (err) {
                console.error(err);
            }
        },
        fetchUser: async () => {
            try {
                const { data: { user, villain } } = await axios.get('/user');

                set({ id: user.id });

                const game_stats = {
                    balance: user.balance,
                    damage: user.damage,
                    critical_chance: user.critical_chance,
                    energy_balance: user.energy_balance,
                    energy_usage: user.energy_usage,
                    max_energy: user.max_energy,
                    mining_balance: user.mining_balance,
                    mining_max_points: user.mining_max_points,
                    mining_duration: user.mining_duration,
                    mining_claimed_at: user.mining_claimed_at,
                };

                setGameStats(game_stats);
                setVillain(villain);
            } catch (err) {
                console.error(err);
            }
        }

    }
});

export default useUserStore;
