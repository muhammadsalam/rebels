import styles from "./styles.module.scss";
import { FC, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { formatNumber, tgApp } from "shared/libs";

type TRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

interface CardProps {
    rarity: TRarity;
    invited: number;
    percent: number;
    bonus: number;
}

export const FriendsInfoPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/friends");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const Card: FC<CardProps> = ({
        rarity,
        invited,
        percent,
        bonus,
        ...props
    }) => {
        return (
            <div
                {...props}
                className={clsx(
                    styles.card,
                    styles[`card__${rarity.toLowerCase()}`]
                )}
            >
                <strong className={styles.card_title}>{rarity}</strong>
                <div className={styles.card_info_top}>
                    <div className={styles.card_info_block}>
                        <strong>{invited}</strong>
                        <p>friends invited</p>
                    </div>
                    <div className={styles.card_info_block}>
                        <strong>{percent} %</strong>
                        <p>from friends</p>
                    </div>
                </div>
                <div className={styles.card_info_bottom}>
                    <div className={styles.card_info_block}>
                        <strong>{formatNumber(bonus)}</strong>
                        <p>level bonus</p>
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
                <Card rarity="Common" invited={16} percent={2} bonus={100000} />
                <Card
                    rarity="Uncommon"
                    invited={24}
                    percent={4}
                    bonus={100000}
                />
                <Card rarity="Rare" invited={32} percent={6} bonus={100000} />
                <Card rarity="Epic" invited={40} percent={8} bonus={100000} />
                <Card
                    rarity="Legendary"
                    invited={16}
                    percent={2}
                    bonus={100000}
                />
            </div>
        </div>
    );
};
