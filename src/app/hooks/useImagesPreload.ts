import { useEffect, useState } from 'react';
import { OUR_FRENS } from 'shared/CONSTANT';
import { preloadImage } from 'shared/libs/utils';

export const useImagesPreload = (canPreload: boolean) => {
    const [isImagesLoading, setIsImagesLoading] = useState(true);

    useEffect(() => {
        if (canPreload) {
            Promise.all(OUR_FRENS.map(src => preloadImage('/assets/images/frens/' + src + '.png')))
                .then(() => {
                    console.log("Images preloaded");
                    setIsImagesLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to preload images", error);
                    setIsImagesLoading(false);
                });
        }

    }, [canPreload]);

    return isImagesLoading;
};
