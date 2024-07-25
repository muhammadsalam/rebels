import useChestsStore from "entities/chests";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import ChestIcon from "icons/chest.svg?react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { tgApp } from "shared/libs";

export const ShopInfoPage = () => {
    const fetchChests = useChestsStore((state) => state.fetchChests);
    const chests = useChestsStore((state) => state.chests);

    const navigate = useNavigate();
    useEffect(() => {
        if (chests.length === 0) fetchChests();

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/shop");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Chests info</h2>
            </div>

            <div className={styles.chests}>
                {chests.map((chest) => (
                    <div
                        key={chest.id}
                        className={clsx(
                            styles.chest,
                            styles[`chest__${chest.rarity.toLowerCase()}`]
                        )}
                    >
                        <h3 className={styles.chest_title}>
                            <ChestIcon className={styles.chest_icon} />
                            {chest.rarity} chest
                        </h3>

                        <div className={styles.chest_info}>
                            {chest.reward.map((reward, index) => (
                                <div
                                    key={index}
                                    className={styles.chest_info_row}
                                >
                                    <span>{reward.percent}</span>
                                    <p>{reward.rarity[0]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
