import useTapsCounterStore from "entities/tapsCounter";
import useUserStore from "entities/user";
import { axios } from "shared/libs";

export default async function () {
    const { taps, critical_taps, seed } = useTapsCounterStore.getState();
    const { id } = useUserStore.getState();

    if (taps === 0 && critical_taps === 0) return;
    if (+new Date() - 2000 <= seed) {
        console.log('bad seed');
        return;
    }
    const item = {
        id,
        taps,
        critical_taps,
        seed
    }

    try {
        useTapsCounterStore.setState({ taps: 0, critical_taps: 0, seed: +new Date() });
        const { data } = await axios.post('/tap', item);
        console.log(data);
    } catch (error) {
        console.error('Error sending taps:', error);
    }
}