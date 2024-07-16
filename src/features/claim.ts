import useTapsCounterStore from "entities/tapsCounter";
import useUserStore from "entities/user";

export default function () {
    const { taps, critical_taps } = useTapsCounterStore.getState();
    const { id } = useUserStore.getState();

    const item = {
        id,
        taps,
        critical_taps,
        seed: +new Date()
    }

    console.log(item);

    useTapsCounterStore.setState({ taps: 0, critical_taps: 0 });
}