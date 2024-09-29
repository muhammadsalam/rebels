export type TChestRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export type Chest = {
    id: number,
    price: number,
    rarity: TChestRarity,
    garanted: TChestRarity | null,
    required_level: number,
    reward: {
        percent: number,
        rarity: TChestRarity[]
    }[]
};

export interface ChestsState {
    chests: Chest[];
    fetchChests: () => void;
};