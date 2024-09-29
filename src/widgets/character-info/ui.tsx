import { FC, HTMLAttributes, memo, useState } from "react";
import { useVillainStore } from "entities/villain/";
import InfoBoxIcon from 'icons/info-box.svg?react';
import { Island, Modal } from "shared/ui";

import styles from "./styles.module.scss";
import useSound from "use-sound";
import { useUserStore } from "entities/user";

export const CharacterInfo: FC<HTMLAttributes<HTMLDivElement>> = memo((props) => {
    const current_name = useVillainStore((state) => state.current_name);
    const current_level = useVillainStore((state) => state.current_level);
    const current_image = useVillainStore(state => state.current_image);
    const current_description = useVillainStore(state => state.current_description);
    const [isInfoActive, setIsInfoActive] = useState(false);

    const sounds = useUserStore(state => state.settings.sounds)

    const [playInfoOpenSound] = useSound('/assets/sounds/open_info.mp3');
    const [playInfoCloseSound] = useSound('/assets/sounds/close_info.mp3');
    const handleInfoBoxClick = () => {
        sounds && playInfoOpenSound();
        setIsInfoActive(true);
    }

    const handleInfoBoxClose = () => {
        sounds && playInfoCloseSound();
        setIsInfoActive(false);
    }

    return (
        <Island {...props} className={styles.wrapper}>
            <div className={styles.info}>
                <span className={styles.info_level}>{current_level} lvl</span>
                <div className={styles.info_line}></div>
                <div className={styles.info_name}>{current_name}</div>
            </div>
            <InfoBoxIcon className={styles.info_icon} onClick={handleInfoBoxClick} />

            {isInfoActive && <Modal closeDisabled onModalHide={() => setIsInfoActive(false)}>
                <div className={styles.person_top}>
                    <img
                        src={`${import.meta.env.VITE_API_BACK}/villain/${current_image}`}
                        alt={current_name}
                        className={styles.person_image}
                    />
                    <div className={styles.person_info}>
                        <strong className={styles.person_title}>{current_name}</strong>
                        <span className={styles.person_level}>{current_level} lvl</span>
                    </div>
                </div>

                <p className={styles.person_text}>{current_description}</p>

                <Island tag="button" onClick={handleInfoBoxClose} className={styles.person_button}>
                    Close
                </Island>
            </Modal>}
        </Island>
    );
});
