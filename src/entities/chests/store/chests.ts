import { axios, showAlert } from 'shared/libs/utils';
import { create } from 'zustand';
import { ChestsState } from '../model/chests.types';

export const useChestsStore = create<ChestsState>((set) => ({
    chests: [],
    fetchChests: async () => {
        try {
            const { data } = await axios.get('/shop/boxes');
            set({ chests: data });
        } catch (error) {
            showAlert('Something went wrong. Please try again later. ' + error);
        }
    }
}));