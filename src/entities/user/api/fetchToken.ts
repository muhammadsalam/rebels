import { axios, showAlert, tgApp } from "shared/libs/utils";
import { useUserStore } from "../model/user";

export const fetchToken = async () => {
    try {
        const initData = import.meta.env.VITE_INITDATA || tgApp.initData;

        const { data, status } = await axios.post('/auth', { initdata: initData });

        if (status !== 200) {
            throw new Error('status code: ' + status);
        }

        useUserStore.setState({ token: data.token });

        return data.token;
    } catch (error: any) {
        showAlert(error);
        return null;
    }
};