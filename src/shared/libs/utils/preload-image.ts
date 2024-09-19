export const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
    });
};