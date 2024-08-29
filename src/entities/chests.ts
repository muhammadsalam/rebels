import { axios, showAlert } from 'shared/libs/utils';
import { create } from 'zustand';

type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

type Chest = {
    id: number,
    price: number,
    rarity: Rarity,
    garanted: Rarity | null,
    required_level: number,
    reward: {
        percent: number,
        rarity: Rarity[]
    }[]
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
                throw new Error('Something went wrong. Please try again later');
            }

            useChestsStore.setState({ chests: data });

        } catch (e) {
            showAlert('Something went wrong. Please try again later. ' + e);
        }
    }
}));

export default useChestsStore;
