import useChestsStore from "entities/chests";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { tgApp } from "shared/libs/utils";

export const ShopInfoPage = () => {
    const chests = useChestsStore((state) => state.chests);

    const navigate = useNavigate();
    useEffect(() => {
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
                        <h3 className={styles.chest_title}>{chest.rarity}</h3>

                        <div className={styles.chest_info}>
                            {chest.reward.map((reward, index) => (
                                <div
                                    key={index}
                                    className={styles.chest_info_row}
                                >
                                    <p>{reward.rarity[0]}</p>
                                    <span>{reward.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
