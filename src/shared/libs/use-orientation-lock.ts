import { useEffect } from 'react';

function useOrientationLock() {
    useEffect(() => {
        function handleOrientationChange() {
            if (window.orientation !== 0) {
                // Если ориентация не портретная, показываем предупреждение
                alert("Please rotate your device to portrait mode.");
                // Автоматический возврат к портретной ориентации (в iOS например, может не работать)
                // @ts-ignore
                window.screen.orientation.lock('portrait').catch((err: any) => {
                    console.warn('Orientation lock failed:', err);
                });
            }
        }

        window.addEventListener('orientationchange', handleOrientationChange);

        // Проверяем текущую ориентацию при монтировании компонента
        handleOrientationChange();

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
}

export default useOrientationLock;
