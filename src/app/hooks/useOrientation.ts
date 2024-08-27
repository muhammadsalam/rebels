import { useEffect, useState } from 'react';

export const useOrientation = () => {
    const [isLandscape, setIsLandscape] = useState<boolean>(
        window.matchMedia('(orientation: landscape)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: landscape)');

        const handleOrientationChange = (e: MediaQueryListEvent) => {
            setIsLandscape(e.matches);
        };

        mediaQuery.addEventListener('change', handleOrientationChange);

        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    return isLandscape;
};
