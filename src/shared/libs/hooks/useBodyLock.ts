import { useEffect } from "react";

export const useBodyLock = (isLocked = true) => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        if (isLocked) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, [isLocked]);
}