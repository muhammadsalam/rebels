import { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';

export const useLoadFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Promise.all([
                    new FontFaceObserver('Pixel Operator').load(null, 140000),
                    new FontFaceObserver('Pixel Operator Mono').load(null, 140000),
                ]);
                setFontsLoaded(true);
            } catch (error) {
                console.error('Font loading error:', error);
                setFontsLoaded(true); // fallback to default fonts if loading fails
            }
        };

        loadFonts();
    }, []);

    return fontsLoaded;
};
