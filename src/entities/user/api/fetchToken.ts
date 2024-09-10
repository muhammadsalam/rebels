import { axios, showAlert, tgApp } from "shared/libs/utils";
import { useUserStore } from "../model/user";

export const fetchToken: (retries?: number) => Promise<string | null> = async (retries = 3) => {
    try {
        const initData = import.meta.env.VITE_INITDATA || tgApp.initData;

        const { data, status } = await axios.post('/auth', { initdata: initData });

        if (status !== 200) {
            throw new Error('status code: ' + status);
        }

        useUserStore.setState({ token: data.token });

        return data.token;
    } catch (error: any) {
        if (retries > 0) {
            return fetchToken(retries - 1);
        } else {
            showAlert(error);
            return null;
        }
    }
};