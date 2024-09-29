import styles from "./styles.module.scss";
import { FC } from "react";
import clsx from "clsx";
import { formatNumber } from "shared/libs/utils";
import { ReferalInfoCard, useReferralStore } from "entities/referral";
import { useBackButton } from "shared/libs/hooks";

export const FriendsInfoPage = () => {
    useBackButton('/friends');

    const infoItems = useReferralStore((state) => state.info);

    const Card: FC<ReferalInfoCard> = ({
        level,
        reward,
        referrals,
        percent,
        ...props
    }) => {
        return (
            <div
                {...props}
                className={clsx(
                    styles.card,
                    styles[`card__${level.toLowerCase()}`]
                )}
            >
                <strong className={styles.card_title}>{level}</strong>
                <p className={styles.card_description}>
                    {referrals === 0 ? 'by default' : `friends needed ${referrals}`}
                </p>
                <div className={styles.card_list}>
                    <div className={styles.card_row}>
                        <strong>Earnings</strong>
                        <span>{percent}%</span>
                    </div>

                    <div className={styles.card_row}>
                        <strong>Bonus</strong>
                        <span>{formatNumber(reward)}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Referral info</h2>
            </div>

            <div className={styles.cards}>
                {infoItems.map((item) => (
                    <Card
                        key={item.level}
                        level={item.level}
                        referrals={item.referrals}
                        percent={item.percent}
                        reward={item.reward}
                    />
                ))}
            </div>
        </div>
    );
};
