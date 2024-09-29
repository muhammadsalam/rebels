import { axios, showAlert, tgApp } from "shared/libs/utils";
import { useUserStore } from "../store/user";

export const fetchToken: (retry?: number) => Promise<string | null> = async (retry = 0) => {
    const MAX_RETRIES = 3;

    try {
        const initData = import.meta.env.VITE_INITDATA || tgApp.initData;

        const { data, status } = await axios.post('/auth', { initdata: initData });

        if (status !== 200) {
            throw new Error('status code: ' + status);
        }

        useUserStore.setState({ token: data.token });

        return data.token;
    } catch (error: any) {
        if (error.code === "ERR_NETWORK" && error.message.includes("Network Error") && retry < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return fetchToken(retry + 1);
        } else {
            showAlert(error);
            return null;
        }
    }
};