import styles from "./styles.module.scss";
import CoinIcon from "icons/coin.svg?react";
import { claimMining, startMining, useGameStatsStore, useUserStore } from "entities/user";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { formatNumber, tgApp } from "shared/libs/utils";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import claimSound from "/assets/sounds/claim.mp3";
import startMiningSound from '/assets/sounds/startmining.mp3';
import { Line } from "shared/ui";

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

    const timeoutIdRef = useRef<number | null>(null);

    const sounds = useUserStore((state) => state.settings.sounds);
    const [playClaimingSound] = useSound(claimSound);
    const [playStartMiningSound] = useSound(startMiningSound);
    const handleOnClickButton = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        target.classList.add(styles.button__active);

        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = window.setTimeout(() => {
            target.classList.remove(styles.button__active);
            timeoutIdRef.current = null;
        }, 200);

        if (mining_claimed_at === 0) {
            sounds && playStartMiningSound();
            return startMining();
        }

        if (mining_balance === mining_max_points) {
            sounds && playClaimingSound();
            return claimMining();
        }
    };

    const getButtonText = () => {
        if (mining_balance === mining_max_points) {
            return (
                <>
                    Claim
                    <span className={styles.button_count}>
                        {formatNumber(mining_max_points, "en-EN")}
                        <CoinIcon width={22} height={22} />
                    </span>
                </>
            );
        }

        if (mining_claimed_at === 0) {
            return "Start";
        }

        return "Wait";
    };

    return (
        <div className={styles.miner}>
            <div className={styles.mine}>
                <button
                    className={styles.button}
                    onClick={(e) => handleOnClickButton(e)}
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
            <Line
                className={styles.line}
                width={mining_claimed_at === 0 ? 0 : (mining_balance / mining_max_points) * 100}
                height={27}
            />
        </div>
    );
};
