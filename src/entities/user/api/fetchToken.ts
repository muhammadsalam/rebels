import { axios, showAlert, tgApp } from "shared/libs/utils";
import { useUserStore } from "../model/user";

export const fetchToken: (retry?: boolean | undefined) => Promise<string | null> = async (retry = undefined) => {
    try {
        const initData = import.meta.env.VITE_INITDATA || tgApp.initData;

        const { data, status } = await axios.post('/auth', { initdata: initData });

        if (status !== 200) {
            throw new Error('status code: ' + status);
        }

        useUserStore.setState({ token: data.token });

        return data.token;
    } catch (error: any) {
        if (retry === undefined || retry) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchToken(true);
        } else {
            showAlert(error);
            return null;
        }
    }
};