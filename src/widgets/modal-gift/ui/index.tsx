import { FC } from "react";
import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import GiftIcon from "icons/gift.svg?react";
import { axios } from "shared/libs/utils";
import { useUserStore } from "entities/user";
import { TReward } from "widgets/modal-reward";

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
                    setIsRewardModalActive(true);
                    setIsRewardModalActive(false);
                    alert("Something went wrong. Please try again later");
                }

                if (data.prize.toLowerCase() === "points") {
                    setReward(data.points);
                    useUserStore.setState({
                        balance: useUserStore.getState().balance + data.points,
                    });
                }

                if (data.prize.toLowerCase() === "hero") {
                    setReward(data.hero);
                }
            } catch (e) {
                console.log(e);
                alert("Something went wrong. Please try again later");
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
