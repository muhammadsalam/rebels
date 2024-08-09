import styles from "./styles.module.scss";
import { TopIslands } from "widgets/top-islands";
import { ClickableCharacter } from "widgets/clickable-character";
import { CharacterInfo } from "widgets/character-info";
import { CharacterStatus } from "widgets/character-status";
import { Navigation } from "widgets/navigation";
import { useEffect, useState } from "react";
import { tgApp } from "shared/libs";
import { Switcher } from "shared/ui";
import { Mine } from "widgets/mine";
import clsx from "clsx";
import useVillainStore from "entities/villain";

export const HomePage = () => {
    useEffect(() => {
        tgApp.BackButton.hide();
    }, []);

    const [active, setActive] = useState(false);
    const handleSwitch = () => {
        setActive((state) => !state);
    };

    const current_health = useVillainStore((state) => state.current_health);
    const person_image = useVillainStore((state) => state.image);
    const wasted = useVillainStore((state) => state.wasted);

    const handleNextVillainClick = () => {
        useVillainStore.setState({
            current_image: person_image,
            wasted: false,
        });
    };

    return (
        <div className={styles.container}>
            <TopIslands />
            <CharacterInfo style={{ width: "calc(100% - 16px)" }} />
            <div className={styles.slider}>
                <div
                    className={clsx(
                        styles.slider_content,
                        active && styles.slider_content__active
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
                    active={active}
                    handleSwitch={handleSwitch}
                    style={{ marginLeft: "auto", marginTop: "-19px" }}
                />
            </div>
            {wasted ? (
                <button
                    className={styles.button__wasted}
                    onClick={handleNextVillainClick}
                    disabled={current_health === 0}
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
