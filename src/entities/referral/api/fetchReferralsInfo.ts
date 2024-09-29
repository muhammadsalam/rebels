import { axios, showAlert } from "shared/libs/utils";

const fetchReferralsInfo = async () => {
    try {
        const { data } = await axios.get('/user/referal');
        return data;
    } catch (error) {
        showAlert('Something went wrong. Please try again later. ' + error);
        return null;
    }
}

export default fetchReferralsInfo;