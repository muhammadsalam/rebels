import _axios from "axios";
import { useUserStore } from "entities/user";

export const axios = _axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
    withCredentials: true,
})

axios.interceptors.request.use(config => {
    const { token } = useUserStore.getState(); // Получаем текущий токен из Zustand
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
