import styles from "./styles.module.scss";
import { TopIslands } from "widgets/top-islands";
import { ClickableCharacter } from "widgets/clickable-character";
import { CharacterInfo } from "widgets/character-info";
import { CharacterStatus } from "widgets/character-status";
import { Navigation } from "widgets/navigation";

export const HomePage = () => {
    return (
        <div className={styles.container}>
            <TopIslands />
            <ClickableCharacter style={{ margin: "auto 0" }} />
            <CharacterInfo />
            <CharacterStatus style={{ marginTop: 36 }} />
            <Navigation style={{ marginTop: 36 }} />
        </div>
    );
};
