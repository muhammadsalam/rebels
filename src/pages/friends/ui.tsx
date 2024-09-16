import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import { memo, useEffect, useRef, useState } from "react";
import { axios, formatNumber, showAlert, tgApp } from "shared/libs/utils";
import useReferalStore from "entities/referal";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import DoneIcon from 'icons/done.svg?react';
import { useUserStore } from "entities/user";
import useSound from "use-sound";
import { Line } from "shared/ui";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
};

function calculateTimeToFill({ claim_time }: any) {
    const current_time = Date.now() / 1000; // Текущее время в секундах

    const time_to_fill = claim_time - current_time;

    if (time_to_fill <= 0) {
        return false;
    }

    return formatTime(time_to_fill);
}

export const FriendsPage = memo(() => {
    const refLink = useRef<HTMLTextAreaElement>(null);

    const { fetchReferals, ...refState } = useReferalStore((state) => state);
    const uci_id = useUserStore((state) => state.uci_id);
    const link = `${import.meta.env.VITE_APP_LINK}=${uci_id}`;
    const [isCopied, setIsCopied] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        fetchReferals();

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(link);

            (async function () {
                const type = "text/plain";
                const blob = new Blob(
                    [link],
                    { type }
                );

                const clipboardItem = new ClipboardItem({
                    [type]: blob,
                });

                navigator.clipboard.write([clipboardItem]).catch(function (error) {
                    throw new Error('Failed to copy: ' + error);
                });
            })();

            refLink.current && refLink.current.select();
            document.execCommand("copy");

            refLink.current && refLink.current.blur();

            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (e) {
            console.log(e);
            setIsCopied(false);
        }
    };

    const claim_time = useReferalStore((state) => state.claim_time);
    const [timeToFill, setTimeToFill] = useState("");

    useEffect(() => {
        const updateTimeToFill = () => {
            const time = calculateTimeToFill({ claim_time });

            setTimeToFill(time ? time : '');
        };

        updateTimeToFill();
        const interval = setInterval(updateTimeToFill, 1000);

        return () => clearInterval(interval);
    }, [claim_time])

    const sounds = useUserStore(state => state.settings.sounds)
    const [isClaiming, setIsClaiming] = useState(false);
    const [playClaimingSound] = useSound('/assets/sounds/claim.mp3');
    const handleClaim = async () => {
        try {
            if (isClaiming) return;

            setIsClaiming(true);

            const { status, data } = await axios.post('/user/referal/claim');

            if (status !== 200) {
                throw new Error('something went wrong');
            }

            sounds && playClaimingSound();

            useUserStore.setState({ balance: data.balance });
            useReferalStore.setState({ claim_time: data.referral_balance_claim_at, balance: 0 });

        } catch (error: any) {
            showAlert(`Something went wrong. Please try again later. ${error.message}`);
        } finally {
            setIsClaiming(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>My Friends</h2>
                </div>
                <Link to="/friends/info" className={styles.top_icon}>
                    <InfoBoxIcon />
                </Link>
            </div>

            <div
                className={clsx(
                    styles.tag,
                    styles[`tag__${refState.level.toLowerCase()}`]
                )}
            >
                {refState.level} referrer
            </div>

            <div className={styles.progress}>
                <textarea defaultValue={link} className={styles.textarea} ref={refLink}></textarea>
                <div className={styles.progress_top}>
                    <div className={styles.progress_top_left}>
                        <div className={styles.progress_top_title}>
                            <span>{refState.ref_count}</span>
                            {
                                refState.level.toLowerCase() !== 'legendary' && <>
                                    {" / "}
                                    {refState.next_level}
                                </>
                            }
                        </div>
                        <p className={styles.progress_top_ph}>
                            friends invited
                        </p>
                    </div>
                    <div className={styles.progress_top_right}>
                        <div className={styles.progress_top_title}>
                            {refState.ref_percent} %
                        </div>
                        <p className={styles.progress_top_ph}>from friends</p>
                    </div>
                </div>
                <Line
                    className={styles.progress_line}
                    width={(refState.ref_count / refState.next_level) * 100}
                    height={9}
                />
                <div className={styles.progress_bottom}>
                    <button className={clsx(styles.progress_button, isCopied && styles.progress_button__done)} onClick={handleCopy}>
                        <div className={styles.progress_button_text}>
                            Copy
                        </div>
                        {isCopied && <DoneIcon className={styles.progress_button_icon} />}
                    </button>
                    <span></span>
                    <a
                        target="_blank"
                        href={`https://t.me/share/url?url=Join the ranks of the REBELS through my link and fight for our common victory!
                            
                        ${link}`}
                        className={styles.progress_button}
                    >
                        Send
                    </a>
                </div>
            </div>

            <div className={styles.claim}>
                <div className={styles.claim_row}>
                    <div className={styles.claim_coins}>
                        <CoinIcon width={24} height={24} />
                        {formatNumber(refState.balance, "ru-RU")}
                    </div>
                    {timeToFill && <div className={styles.claim_time}>{timeToFill}</div>}
                </div>
                <div className={styles.claim_row}>
                    <p className={styles.progress_top_ph}>referral earnings</p>
                    {timeToFill && <p className={styles.progress_top_ph}>claim in </p>}
                </div>
                <Line
                    className={styles.claim_line}
                    width={Math.min(((((+new Date() / 1000) - (refState.claim_time - 12 * 60 * 60)) / (12 * 60 * 60)) * 100), 100)}
                    height={9}
                />
            </div>

            {<button onClick={handleClaim} className={clsx(styles.claim_button, styles.claim_time)} disabled={!!timeToFill || claim_time === 0}>
                {timeToFill ? "Wait" : "Claim"}
            </button>}
        </div>
    );
});
