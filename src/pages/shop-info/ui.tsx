import { useChestsStore } from "entities/chests";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useBackButton } from "shared/libs/hooks";

export const ShopInfoPage = () => {
    useBackButton('/shop');

    const chests = useChestsStore((state) => state.chests);
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
