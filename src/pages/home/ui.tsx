import styles from "./styles.module.scss";
import { TopIslands } from "widgets/top-islands";
import { ClickableCharacter } from "widgets/clickable-character";
import { CharacterInfo } from "widgets/character-info";
import { CharacterStatus } from "widgets/character-status";
import { Navigation } from "widgets/navigation";
import { useEffect, useState } from "react";
import { preloadImage, tgApp } from "shared/libs/utils";
import { Switcher } from "shared/ui";
import { Mine } from "widgets/mine";
import clsx from "clsx";
import { useVillainStore } from "entities/villain/";
import useSound from "use-sound";
import { useUserStore } from "entities/user";

export const HomePage = () => {
    useEffect(() => {
        tgApp.BackButton.hide();
    }, []);

    const sounds = useUserStore(state => state.settings.sounds)

    const [playSwitchSound] = useSound('/assets/sounds/click.mp3');
    const [isSwitched, setIsSwitched] = useState(false);
    const handleSwitch = () => {
        sounds && playSwitchSound();
        setIsSwitched((state) => !state);
    };

    const current_health = useVillainStore((state) => state.current_health);
    const wasted = useVillainStore((state) => state.wasted);
    const toggleVillain = useVillainStore(state => state.toggleVillain);
    const [playNextRogueAudio] = useSound('/assets/sounds/nextvillain.mp3');
    const handleNextVillain = () => {
        sounds && playNextRogueAudio();
        toggleVillain();
    };

    const [isVillainLoaded, setIsVillainLoaded] = useState(false);
    useEffect(() => {
        if (wasted && current_health !== 0) {
            preloadImage(`${import.meta.env.VITE_API_BACK}/villain/${useVillainStore.getState().image}`).then((state) => {
                setIsVillainLoaded(state);
            });
        }
    }, [wasted, current_health])

    return (
        <div className={styles.container}>
            <TopIslands />
            <CharacterInfo />
            <div className={styles.slider}>
                <div
                    className={clsx(
                        styles.slider_content,
                        isSwitched && styles.slider_content__active
                    )}
                >
                    <div className={styles.slider_item}>
                        <ClickableCharacter />
                    </div>
                    <div className={styles.slider_item}>
                        <Mine />
                    </div>
                </div>
                <Switcher
                    active={isSwitched}
                    handleSwitch={handleSwitch}
                    style={{ marginLeft: "auto", marginTop: "-19px" }}
                />
            </div>
            {wasted ? (
                <button
                    className={styles.button__wasted}
                    onClick={handleNextVillain}
                    disabled={current_health === 0 || !isVillainLoaded}
                >
                    Next rogue
                </button>
            ) : (
                <CharacterStatus />
            )}
            <Navigation />
        </div>
    );
};
