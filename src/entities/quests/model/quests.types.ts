export type QuestType = 'TELEGRAM' | any;

export type Quest = {
    id: number;
    name: string;
    reward: number;
    url: string;
    status: 'Start' | 'Check' | 'Claim' | 'Done';
    attemps: number;
    scenario: 1 | 2 | 3;
    type: QuestType;
}

export interface HeroState {
    quests: Quest[];
    isProcessing: boolean;
    fetchQuests: () => void;
}