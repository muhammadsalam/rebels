import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { formatNumber, tgApp } from "shared/libs/utils";
import useReferalStore, { ReferalInfoCard } from "entities/referal";
import { Loading } from "widgets/loading";

export const FriendsInfoPage = () => {
    const fetchReferalsInfo = useReferalStore((state) => state.fetchReferalsInfo);
    const infoItems = useReferalStore((state) => state.info);

    const navigate = useNavigate();
    useEffect(() => {
        if (infoItems.length === 0) {
            fetchReferalsInfo();
        }

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/friends");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => setIsLoading(false), 1000);

    if (infoItems.length === 0 || isLoading) return <Loading />;

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
