import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import ChestIcon from "icons/chest.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { formatNumber, tgApp } from "shared/libs";
import { useEffect } from "react";

export const ChestsPage = () => {
    const chests = [
        {
            id: 1,
            title: "legendary",
            price: 120000,
            count: 0,
        },
        {
            id: 2,
            title: "epic",
            price: 100_000,
            count: 3,
        },
        {
            id: 3,
            title: "rare",
            price: 90_000,
            count: 0,
        },
        {
            id: 4,
            title: "uncommon",
            price: 50_000,
            count: 0,
        },
        {
            id: 5,
            title: "common",
            price: 10_000,
            count: 0,
        },
    ];

    const handleChestClick = (count: number) => {
        if (count === 0) return;
    };

    const navigate = useNavigate();

    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/team");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>Chests</h2>
                </div>
                <Link to="/chests/info" className={styles.top_icon}>
                    <InfoBoxIcon />
                </Link>
            </div>

            <div className={styles.chests}>
                {chests.map((chest) => {
                    return (
                        <div
                            key={chest.id}
                            className={clsx(
                                styles.chest,
                                styles[`chest__${chest.title}`],
                                chest.count > 0 && styles.chest__available
                            )}
                        >
                            <div className={styles.chest_icon}>
                                <ChestIcon />
                            </div>
                            <div className={styles.chest_info}>
                                <strong className={styles.chest_title}>
                                    {chest.title}
                                    {chest.count > 0 && (
                                        <span
                                            className={styles.chest_title_span}
                                        >
                                            {chest.count}
                                        </span>
                                    )}
                                </strong>
                                <p className={styles.chest_price}>
                                    <CoinIcon className={styles.chest_coin} />
                                    {formatNumber(chest.price, "ru-RU")}
                                </p>
                            </div>

                            <button
                                className={styles.chest_button}
                                onClick={() => handleChestClick(chest.count)}
                            >
                                {chest.count > 0 ? "Open" : "Buy"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
