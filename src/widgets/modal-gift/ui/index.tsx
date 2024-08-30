import { FC } from "react";
import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import GiftIcon from "icons/gift.svg?react";
import { axios, showAlert } from "shared/libs/utils";
import { useGameStatsStore, useUserStore } from "entities/user";
import { TReward } from "widgets/modal-reward";
import { useHeroStore } from "entities/heroes";

export const ModalGift: FC<{
    onModalHide: () => void;
    setReward: (
        reward: number | TReward | null
    ) => void;
    setIsRewardModalActive: (_: boolean) => void;
    setIsDailyGiftActive: (_: boolean) => void;
}> = ({
    onModalHide,
    setReward,
    setIsRewardModalActive,
    setIsDailyGiftActive,
}) => {
        const onCardClick = async (index: number) => {
            try {
                setIsRewardModalActive(true);
                setIsDailyGiftActive(false);
                const { status, data } = await axios.get(`/spin/run?${index}`);

                if (status !== 200) {
                    setIsRewardModalActive(false);
                    throw new Error("Something went wrong. Please try again later");
                }

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
                        level: data.profile.level
                    })
                }

                useGameStatsStore.setState({
                    energy_update: data.energy_update,
                    max_energy: data.max_energy,
                })
            } catch (e) {
                showAlert("Something went wrong. Please try again later. " + e);
            }
        };

        return (
            <Modal
                heading="Daily gift"
                subheading="Choose your option"
                onModalHide={onModalHide}
            >
                <div className={styles.cards}>
                    {new Array(4).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => onCardClick(index + 1)}
                        >
                            <GiftIcon />
                        </div>
                    ))}
                </div>
            </Modal>
        );
    };
