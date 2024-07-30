import styles from "./styles.module.scss";
import { TopIslands } from "widgets/top-islands";
import { ClickableCharacter } from "widgets/clickable-character";
import { CharacterInfo } from "widgets/character-info";
import { CharacterStatus } from "widgets/character-status";
import { Navigation } from "widgets/navigation";
import { useEffect } from "react";
import { tgApp } from "shared/libs";

export const HomePage = () => {
    useEffect(() => {
        tgApp.BackButton.hide();
    }, []);

    return (
        <div className={styles.container}>
            <TopIslands />
            <CharacterInfo style={{ width: "calc(100% - 16px)" }} />
            <ClickableCharacter />
            <CharacterStatus />
            <Navigation />
        </div>
    );
};
