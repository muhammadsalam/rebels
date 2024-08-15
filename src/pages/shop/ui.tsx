import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import ChestIcon from "icons/chest.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { axios, formatNumber, tgApp } from "shared/libs";
import { useEffect, useState } from "react";
import useChestsStore from "entities/chests";
import useUserStore from "entities/user";
import { ModalReward } from "widgets/modal-reward";
import useHeroStore, { Card } from "entities/heroes";
import useGameStatsStore from "entities/gameStats";

export const ShopPage = () => {
    const chests = useChestsStore((state) => state.chests);
    const balance = useUserStore((state) => state.balance);
    const level = useUserStore((state) => state.level);
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

    const [isRewardModalActive, setIsRewardModalActive] = useState(false);
    const [reward, setReward] = useState<{
        name: string;
        rarity: string;
    } | null>(null);

    const handleBuyChest = async (id: number) => {
        setIsRewardModalActive(true);
        const { status, data } = await axios.post(`/shop/buy/box/${id}`);

        if (status !== 200) {
            setIsRewardModalActive(false);
            return alert("Failed to buy chest. Please try again later.");
        }

        useUserStore.setState({ balance: data.balance, level: data.level });
        useHeroStore.setState({
            cards: data.heroes,
            team: data.heroes.filter((item: Card) => item.changed),
        });
        useGameStatsStore.setState({ energy_update: data.energy_update, max_energy: data.max_energy })
        const new_chests = chests.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    price: Math.round(item.price * 1.2)
                }
            }
            return item
        });
        useChestsStore.setState({ chests: new_chests });

        setReward(data.reward[0]);
    };

    const handleClaimChest = () => {
        setIsRewardModalActive(false);
        setReward(null);
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
                {[...chests].reverse().map((chest) => (
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
                            <p
                                className={clsx(
                                    styles.chest_price,
                                    (balance < chest.price) &&
                                    styles.chest_price__disabled,
                                    level < chest.required_level && styles.chest_price__unavailable
                                )}
                            >
                                {level >= chest.required_level ? <>

                                    <CoinIcon className={styles.chest_coin} />
                                    {formatNumber(chest.price, "ru-RU")}
                                </> : `available from level ${chest.required_level}`}
                            </p>
                        </div>

                        <button
                            className={styles.chest_button}
                            onClick={() => handleBuyChest(chest.id)}
                            disabled={balance < chest.price || level < chest.required_level}
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>

            {isRewardModalActive && (
                <ModalReward
                    reward={reward}
                    handleClaimChest={handleClaimChest}
                />
            )}
        </div>
    );
};
