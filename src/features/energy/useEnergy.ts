import { addEnergy, useUserStore } from 'entities/user';
import { useCallback } from 'react';
import { useInterval } from 'shared/libs/hooks';

export const useEnergy = () => {
    const userId = useUserStore((state) => state.id);

    const addEnergyCallback = useCallback(() => {
        if (userId !== null) {
            addEnergy();
        }
    }, [userId]);

    useInterval(addEnergyCallback, userId !== null ? 1000 : null);
};
