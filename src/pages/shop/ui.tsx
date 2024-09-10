import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import ChestIcon from "icons/chest.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { axios, formatNumber, showAlert, tgApp } from "shared/libs/utils";
import { useEffect, useState } from "react";
import useChestsStore from "entities/chests";
import { useUserStore, useGameStatsStore } from "entities/user";
import { ModalReward, TReward } from "widgets/modal-reward";
import { useHeroStore } from "entities/heroes";
import useSound from "use-sound";

export const ShopPage = () => {
    const chests = useChestsStore((state) => state.chests);
    const balance = useUserStore((state) => state.balance);
    const level = useUserStore((state) => state.level);

    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const sounds = useUserStore(state => state.settings.sounds)

    const [isRewardModalActive, setIsRewardModalActive] = useState(false);
    const [reward, setReward] = useState<TReward | null>(null);
    const [isBuying, setIsBuying] = useState(false);
    const [playChestAudio] = useSound('/assets/sounds/chest.mp3');

    const handleBuyChest = async (id: number) => {
        try {
            if (isBuying) return;
            setIsBuying(true)

            const { status, data } = await axios.post(`/shop/buy/box/${id}`);

            if (status !== 200) {
                throw new Error("Failed to buy chest. Please try again later.");
            }

            sounds && playChestAudio();
            setIsRewardModalActive(true);
            useUserStore.setState({ balance: data.balance, level: data.profile.level, level_name: data.profile.level_name });
            useHeroStore.setState({ cards: data.heroes });
            useHeroStore.getState().teamFromCards();
            useGameStatsStore.setState({
                energy_update: data.energy_update,
                max_energy: data.max_energy,

                total_value: data.profile.total_value,
                total_values: data.profile.total_values,
                start_level_value: data.profile.start_value,
                next_level_value: data.profile.next_level_value,
            });
            const new_chests = chests.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        price: data.new_price
                    }
                }
                return item
            });
            useChestsStore.setState({ chests: new_chests });

            setReward(data.reward[0]);

        } catch (error) {
            showAlert(`Failed to buy chest. Please try again later. ${error}`);
        } finally {
            setIsBuying(false)
        }
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
                    <button
                        key={chest.id}
                        className={clsx(
                            styles.chest,
                            styles[`chest__${chest.rarity.toLowerCase()}`]
                        )}
                        onClick={() => handleBuyChest(chest.id)}
                        disabled={balance < chest.price || level < chest.required_level || isBuying}
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

                        <span className={styles.chest_status}>
                            Buy
                        </span>
                    </button>
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
