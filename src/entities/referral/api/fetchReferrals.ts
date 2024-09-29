import { axios, showAlert } from "shared/libs/utils";

const fetchReferrals = async () => {
    try {
        const { data } = await axios.get('/user/referal/stats');
        return data;
    } catch (error) {
        showAlert('Something went wrong. Please try again later. ' + error);
        return null;
    }
}

export default fetchReferrals;