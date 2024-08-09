import { useState } from "react";

export const DailyGiftStates = () => {
    const [isDailyGiftActive, setIsDailyGiftActive] = useState(true);

    const onModalHide = () => {
        setIsDailyGiftActive(false);
    };

    return { isDailyGiftActive, onModalHide, setIsDailyGiftActive };

}