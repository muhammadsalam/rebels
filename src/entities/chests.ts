import { axios } from 'shared/libs';
import { create } from 'zustand';

type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

type Chest = {
    id: number,
    level: number,
    price: number,
    count: number,
    rarity: Rarity,
    garanted: Rarity | null,
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

            if (status === 200) {
                useChestsStore.setState({ chests: data });
            }

        } catch (e) {
            console.error(e);
        }
    }
}));

export default useChestsStore;
