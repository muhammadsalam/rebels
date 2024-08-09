import { FC } from "react";
import styles from "./styles.module.scss";
import { Modal } from "shared/ui";
import CoinIcon from "icons/coin.svg?react";
import { formatNumber } from "shared/libs";

type Reward =
    | {
          name: string;
          rarity: string;
      }
    | number;

export const ModalReward: FC<{
    reward: Reward | null;
    handleClaimChest: () => void;
}> = ({ reward, handleClaimChest }) => {
    return (
        <Modal onModalHide={handleClaimChest} heading="Your reward">
            <div className={styles.reward_info}>
                {reward ? (
                    typeof reward === "number" ? (
                        <strong className={styles.reward_title__points}>
                            <CoinIcon /> {formatNumber(reward, "en-US")}
                        </strong>
                    ) : (
                        <>
                            <div className={styles.reward_img}>
                                <img
                                    src={`/assets/card-item-${reward.rarity.toLowerCase()}.png`}
                                    alt=""
                                />
                            </div>
                            <strong className={styles.reward_title}>
                                {reward.name}
                            </strong>
                        </>
                    )
                ) : (
                    <strong className={styles.reward_title}>Загрузка...</strong>
                )}
            </div>

            <button
                onClick={handleClaimChest}
                className={styles.reward_button}
                disabled={!reward}
            >
                Claim
            </button>
        </Modal>
    );
};
