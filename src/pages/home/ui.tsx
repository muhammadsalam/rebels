import { CoinsIsland } from "widgets/coins-island";
import styles from "./styles.module.scss";
import { ClickableCharacter } from "widgets/clickable-character";
import { CharacterInfo } from "widgets/character-info";

export const HomePage = () => {
    return (
        <div className={styles.container}>
            <CoinsIsland />
            <ClickableCharacter style={{ marginTop: 50 }} />
            <CharacterInfo style={{ marginTop: 50 }} />
        </div>
    );
};
