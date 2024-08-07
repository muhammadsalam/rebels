import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import useGameStatsStore from "entities/gameStats";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { tgApp } from "shared/libs";
import claimMining from "features/claimMining";
import { useNavigate } from "react-router-dom";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
};

function calculateTimeToFill({ mining_claimed_at, mining_duration }: any) {
    if (mining_claimed_at === 0 && mining_duration === 0) {
        return "0h 0m 0s";
    }

    const currentTime = Math.ceil(Date.now()) / 1000; // Текущее время в секундах
    const miningDurationSeconds = mining_duration * 3600; // Продолжительность добычи в секундах
    const miningEndTime = mining_claimed_at + miningDurationSeconds;

    const timeToFill = miningEndTime - currentTime;
    return timeToFill <= 0 ? "0h 0m 0s" : formatTime(timeToFill);
}

export const Mine = () => {
    const mining_balance = useGameStatsStore((state) => state.mining_balance);
    const mining_max_points = useGameStatsStore(
        (state) => state.mining_max_points
    );
    const mining_duration = useGameStatsStore((state) => state.mining_duration);
    const mining_speed = useGameStatsStore((state) => state.mining_speed);
    const mining_claimed_at = useGameStatsStore(
        (state) => state.mining_claimed_at
    );

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

    const [timeToFill, setTimeToFill] = useState("");

    useEffect(() => {
        const updateTimeToFill = () => {
            if (
                (mining_claimed_at === 0 && mining_balance === 0) ||
                mining_balance >= mining_max_points
            ) {
                return;
            }

            const time = calculateTimeToFill({
                mining_balance,
                mining_claimed_at,
                mining_duration,
                mining_max_points,
            });

            setTimeToFill(time);

            const newBalance = Math.min(
                ((+new Date() / 1000 - mining_claimed_at) / 3600) *
                    mining_speed,
                mining_max_points
            );

            useGameStatsStore.setState({
                mining_balance: newBalance,
            });
        };

        updateTimeToFill();
        const interval = setInterval(updateTimeToFill, 1000);

        return () => clearInterval(interval);
    }, [mining_claimed_at]);

    const handleOnClickButton = () => {
        if (mining_claimed_at === 0) {
            return useGameStatsStore.getState().startMining();
        }

        if (mining_balance === mining_max_points) {
            return claimMining();
        }
    };

    const getButtonText = () => {
        if (mining_balance === mining_max_points) {
            return (
                <>
                    CLAIM {mining_max_points}
                    <CoinIcon className={styles.button_icon} />
                </>
            );
        }

        if (mining_claimed_at === 0) {
            return "START";
        }

        return "WAIT";
    };

    return (
        <div className={styles.miner}>
            <div className={styles.mine}>
                <button
                    className={styles.button}
                    onClick={handleOnClickButton}
                    disabled={
                        mining_claimed_at !== 0 &&
                        mining_balance !== mining_max_points
                    }
                >
                    {getButtonText()}
                </button>
                <div className={styles.mine_row}>
                    <div className={styles.mine_item}>
                        <CoinIcon className={styles.mine_item_icon} />
                        /hour
                    </div>
                    <strong className={styles.mine_item}>
                        {Math.floor(mining_max_points / mining_duration)}
                    </strong>
                </div>
                <div className={styles.mine_row}>
                    <div className={styles.mine_item}>In storage</div>
                    <strong className={styles.mine_item}>
                        {mining_claimed_at === 0 && mining_balance === 0
                            ? 0
                            : Math.floor(mining_balance)}
                    </strong>
                </div>
                <div className={styles.mine_row}>
                    <div className={styles.mine_item}>Time to fill</div>
                    <strong className={styles.mine_item}>
                        {mining_claimed_at === 0 ||
                        mining_balance === mining_max_points
                            ? "0h 0m 0s"
                            : timeToFill}
                    </strong>
                </div>
            </div>
            <div className={styles.line}>
                <div
                    className={clsx(
                        styles.line_inner,
                        mining_max_points === mining_balance &&
                            styles.line_inner__full
                    )}
                    style={{
                        width: `${
                            mining_claimed_at === 0
                                ? 0
                                : (mining_balance / mining_max_points) * 100
                        }%`,
                    }}
                ></div>
            </div>
        </div>
    );
};
