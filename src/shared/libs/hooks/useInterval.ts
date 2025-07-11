import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;
        const id = setInterval(() => savedCallback.current && savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
};
