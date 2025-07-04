import { FC, useState } from "react";
import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import { axios, showAlert } from "shared/libs/utils";
import { useGameStatsStore, useUserStore } from "entities/user";
import { TReward } from "widgets/modal-reward";
import { useHeroStore } from "entities/heroes";
import useSound from "use-sound";
import { OUR_FRENS } from "shared/CONSTANT";

export const ModalGift: FC<{
    onModalHide: () => void;
    setReward: (reward: number | TReward | null) => void;
    setIsRewardModalActive: (_: boolean) => void;
    setIsDailyGiftActive: (_: boolean) => void;
}> = ({
    onModalHide,
    setReward,
    setIsRewardModalActive,
    setIsDailyGiftActive,
}) => {
        const sounds = useUserStore(state => state.settings.sounds)
        const [isDailySending, setIsDailySending] = useState(false);
        const [playGiftSound] = useSound("/assets/sounds/gift.mp3");

        const onCardClick = async (fren_name: string) => {
            try {
                console.log(isDailySending);
                sounds && playGiftSound();
                if (isDailySending) return;
                setIsDailySending(true);

                const { status, data } = await axios.get(`/spin/run?${fren_name}`);

                if (status !== 200) {
                    setIsRewardModalActive(false);
                    throw new Error("Something went wrong. Please try again later");
                }

                setIsRewardModalActive(true);
                setIsDailyGiftActive(false);

                if (data.prize.toLowerCase() === "points") {
                    setReward(data.points);
                    useUserStore.setState({
                        balance: data.balance,
                    });
                }

                if (data.prize.toLowerCase() === "hero") {
                    setReward(data.hero);
                    useHeroStore.setState({ cards: data.heroes });
                    useHeroStore.getState().teamFromCards();
                    useGameStatsStore.setState({
                        next_level_value: data.profile.next_level_value,
                        start_level_value: data.profile.start_value,
                        total_value: data.profile.total_value,
                        total_values: data.profile.total_values,
                    });
                    useUserStore.setState({
                        level_name: data.profile.level_name,
                        level: data.profile.level,
                    });
                }

                useGameStatsStore.setState({
                    energy_update: data.energy_update,
                    max_energy: data.max_energy,
                    daily_available_at: data.daily_avaible_at,
                });

                setIsDailySending(false);
            } catch (e) {
                showAlert("Something went wrong. Please try again later. " + e);

                setIsDailySending(false);
            }
        };

        const [gift_cards] = useState<string[]>(['', '', '', ''].reduce<string[]>((acc) => {
            let fren_name = '';

            do {
                fren_name = OUR_FRENS[Math.floor(Math.random() * OUR_FRENS.length)];
            } while (acc.includes(fren_name));

            acc.push(fren_name);

            return acc;
        }, []));

        return (
            <Modal
                heading="Daily gift"
                subheading="Choose your option"
                onModalHide={onModalHide}
            >
                <div className={styles.cards}>
                    {gift_cards.map((fren_name, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => onCardClick(fren_name)}
                        >
                            <img className={styles.card_img} src={`/assets/images/frens/${fren_name}.png`} alt="" />
                        </div>
                    ))}
                </div>
            </Modal>
        );
    };
