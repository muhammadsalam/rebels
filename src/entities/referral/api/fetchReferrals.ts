import { axios, showAlert } from "shared/libs/utils";

export default async () => {
    try {
        const { data } = await axios.get('/user/referal/stats');
        return data;
    } catch (error) {
        showAlert('Something went wrong. Please try again later. ' + error);
        return null;
    }
}