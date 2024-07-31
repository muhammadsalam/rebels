import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import ChestIcon from "icons/chest.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { axios, formatNumber, tgApp } from "shared/libs";
import { useEffect } from "react";
import useChestsStore from "entities/chests";
import useUserStore from "entities/user";

export const ShopPage = () => {
    const chests = useChestsStore((state) => state.chests);
    const balance = useUserStore((state) => state.balance);
    const fetchChest = useChestsStore((state) => state.fetchChests);

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (chests.length === 0) {
                await fetchChest();
            }
        })();

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const handleBuyChest = async (id: number) => {
        const { status, data } = await axios.post(`/shop/buy/box/${id}`);

        if (status === 200) {
            console.log("bought");
            return console.log(data);
        }

        console.log(data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>Shop</h2>
                </div>
                <Link to="/shop/info" className={styles.top_icon}>
                    <InfoBoxIcon />
                </Link>
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
                        <div className={styles.chest_icon}>
                            <ChestIcon />
                        </div>
                        <div className={styles.chest_info}>
                            <strong className={styles.chest_title}>
                                {chest.rarity} chest
                            </strong>
                            <p className={styles.chest_price}>
                                <CoinIcon className={styles.chest_coin} />
                                {formatNumber(chest.price, "ru-RU")}
                            </p>
                        </div>

                        <button
                            className={styles.chest_button}
                            onClick={() => handleBuyChest(chest.id)}
                            disabled={balance < chest.price}
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
