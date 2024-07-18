import { CoinsIsland } from "widgets/coins-island";
import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import useGameStatsStore from "entities/gameStats";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { tgApp } from "shared/libs";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
};

function calculateTimeToFill({
    mining_balance,
    mining_claimed_at,
    mining_duration,
    minigng_max_points,
}: any) {
    if (mining_balance === minigng_max_points) {
        return "0h 0m 0s";
    }

    const currentTime = Date.now() / 1000; // Текущее время в секундах
    const miningDurationSeconds = mining_duration * 3600; // Продолжительность добычи в секундах
    const miningEndTime = mining_claimed_at + miningDurationSeconds;

    const timeToFill = miningEndTime - currentTime;
    return formatTime(timeToFill);
}

export const MinePage = () => {
    const mining_balance = useGameStatsStore((state) => state.mining_balance);
    const mining_max_points = useGameStatsStore(
        (state) => state.mining_max_points
    );
    const mining_duration = useGameStatsStore((state) => state.mining_duration);
    const mining_claimed_at = useGameStatsStore(
        (state) => state.mining_claimed_at
    );

    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            window.history.back();
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const [timeToFill, setTimeToFill] = useState("");

    useEffect(() => {
        const updateTimeToFill = () => {
            const time = calculateTimeToFill({
                mining_balance,
                mining_claimed_at,
                mining_duration,
                mining_max_points,
            });
            setTimeToFill(time);
            useGameStatsStore.setState({
                mining_balance:
                    ((mining_max_points / mining_duration) *
                        (Date.now() / 1000 - mining_claimed_at)) /
                    3600,
            });
        };

        updateTimeToFill();
        const interval = setInterval(updateTimeToFill, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleOnClickButton = () => {
        if (mining_balance === 0) {
            return useGameStatsStore.getState().startMining();
        }

        if (mining_balance === mining_max_points) {
            return useGameStatsStore.getState().claimMining();
        }
    };

    const getButtonText = () => {
        if (mining_balance === mining_max_points) {
            return (
                <>
                    Claim {mining_max_points}
                    <CoinIcon className={styles.button_icon} />
                </>
            );
        }
        if (mining_balance === 0) {
            return "Start";
        }
        return "Wait";
    };

    return (
        <div className={styles.container}>
            <CoinsIsland className={styles.island} />
            <div className={styles.mine}>
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
                        {Math.floor(mining_balance)}
                    </strong>
                </div>
                <div className={styles.mine_row}>
                    <div className={styles.mine_item}>Time to fill</div>
                    <strong className={styles.mine_item}>{timeToFill}</strong>
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
                        width: `${(mining_balance / mining_max_points) * 100}%`,
                    }}
                ></div>
            </div>
            <button
                className={styles.button}
                onClick={handleOnClickButton}
                disabled={
                    mining_balance > 0 && mining_balance < mining_max_points
                }
            >
                {getButtonText()}
            </button>
        </div>
    );
};
