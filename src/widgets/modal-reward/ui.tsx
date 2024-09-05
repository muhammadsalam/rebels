import { FC } from "react";
import styles from "./styles.module.scss";
import { Modal } from "shared/ui";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs/utils";
import clsx from "clsx";
import useSound from "use-sound";
import { useUserStore } from "entities/user";

export type TReward =
    | {
        name: string;
        rarity: string;
        photo: string;
    }
    | number;

export const ModalReward: FC<{
    reward: TReward | null;
    handleClaimChest: () => void;
}> = ({ reward, handleClaimChest }) => {

    const sounds = useUserStore(state => state.settings.sounds)
    const [playGiftSound] = useSound("/assets/sounds/gift.mp3");
    const handleClaimClick = () => {
        sounds && playGiftSound();
        handleClaimChest();
    }
    return (
        <Modal onModalHide={handleClaimChest} heading="Your reward">
            <div
                className={clsx(
                    styles.reward_info,
                    reward &&
                    typeof reward !== "number" &&
                    styles[`reward_info__${reward.rarity.toLowerCase()}`]
                )}
            >
                {reward ? (
                    typeof reward === "number" ? (
                        <strong className={styles.reward_title__points}>
                            <CoinIcon /> {formatNumber(reward, "en-US")}
                        </strong>
                    ) : (
                        <>
                            <div className={styles.reward_img}>
                                <img
                                    src={`${import.meta.env.VITE_API_BACK}/hero/${reward.photo}`}
                                    alt={reward.name}
                                />
                            </div>
                            <strong className={styles.reward_title}>
                                {reward.name}
                            </strong>
                        </>
                    )
                ) : (
                    <strong className={styles.reward_title}>Loading...</strong>
                )}
            </div>
            <button
                onClick={handleClaimClick}
                className={styles.reward_button}
                disabled={!reward}
            >
                Claim
            </button>
        </Modal>
    );
};
