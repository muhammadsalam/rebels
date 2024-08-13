import { axios } from 'shared/libs';
import { create } from 'zustand';

type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

type Chest = {
    id: number,
    price: number,
    count: number,
    rarity: Rarity,
    garanted: Rarity | null,
    required_level: number,
    reward: [
        {
            percent: number,
            rarity: Rarity[]
        }
    ]
};

interface ChestsState {
    chests: Chest[];
    fetchChests: () => void;
}

const useChestsStore = create<ChestsState>(() => ({
    chests: [],
    fetchChests: async () => {
        try {
            const { status, data } = await axios.get('/shop/boxes');

            if (status !== 200) {
                return alert('Something went wrong. Please try again later');
            }

            useChestsStore.setState({ chests: data });

        } catch (e) {
            console.error('Something went wrong:', e);
        }
    }
}));

export default useChestsStore;
