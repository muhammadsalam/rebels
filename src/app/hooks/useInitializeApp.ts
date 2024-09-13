import { useEffect, useState } from 'react';
import { tgApp } from 'shared/libs/utils';
import { fetchUser } from 'entities/user/api/fetchUser';
import { useAuth } from 'features/auth';
import { useUserStore } from 'entities/user';

export const useInitializeApp = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        tgApp.ready();
        tgApp.enableClosingConfirmation();
        tgApp.setHeaderColor("#0A0A0A");
        tgApp.setBackgroundColor("#0A0A0A");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

        if (parseFloat(tgApp.version) > 6.9) {
          tgApp.CloudStorage.getItem('sounds', (_: any, value: any) => {
            useUserStore.setState((state) => ({
              ...state,
              settings: { ...state.settings, sounds: value }
            }))
          });
        } else {
          useUserStore.setState((state) => ({
            ...state,
            settings: { ...state.settings, sounds: localStorage.getItem('sounds') === 'true' }
          }))
        }


        const token = await getToken();

        if (token) {
          await fetchUser().then((state) => setIsInitialized(state));
        }
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();
  }, [getToken]);

  return { isInitialized };
};
