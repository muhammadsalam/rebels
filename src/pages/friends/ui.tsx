import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import InfoBoxIcon from "icons/info-box.svg?react";
import { useEffect } from "react";
import { formatNumber, tgApp } from "shared/libs";
import useReferalStore from "entities/referal";
import { Loading } from "widgets/loading";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";

export const FriendsPage = () => {
    const { fetchReferals, ...refState } = useReferalStore((state) => state);

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

    if (refState.level === "") return <Loading />;

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
                <div className={styles.progress_top}>
                    <div className={styles.progress_top_left}>
                        <div className={styles.progress_top_title}>
                            <span>{refState.ref_count}</span> /{" "}
                            {refState.next_level}
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
                <div className={styles.progress_line}>
                    <div
                        className={styles.progress_line_inner}
                        style={{
                            width: `${
                                (refState.ref_count / refState.next_level) * 100
                            }%`,
                        }}
                    ></div>
                </div>
                <div className={styles.progress_bottom}>
                    <button className={styles.progress_button}>Copy</button>
                    <span></span>
                    <a
                        target="_blank"
                        href="https://t.me/share/url?url=Join the ranks of the REBELS through my link and fight for our common victory!
                            
                        http://t.me/d_rebels_bot/app?startapp=1234567890"
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
                        {formatNumber(100000, "ru-RU")}
                    </div>
                    <div className={styles.claim_time}>3h 12m</div>
                </div>
                <div className={styles.claim_row}>
                    <p className={styles.progress_top_ph}>referral earnings</p>
                    <p className={styles.progress_top_ph}>claim in </p>
                </div>
                <div className={styles.claim_line}>
                    <div
                        className={styles.claim_line_inner}
                        style={{
                            width: `${(4 / refState.next_level) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>

            <button className={styles.claim_button} disabled={true}>
                Wait
            </button>
        </div>
    );
};
