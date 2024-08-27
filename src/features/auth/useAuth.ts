// src/features/auth/model/useAuth.ts
import { useCallback } from 'react';
import { useUserStore, fetchToken } from 'entities/user';

export const useAuth = () => {
    const getToken = useCallback(async () => {
        const token = await fetchToken();
        if (token) {
            useUserStore.setState({ token });
            return token;
        }
        return null;
    }, []);

    return { getToken };
};
