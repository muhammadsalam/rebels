import styles from "./styles.module.scss";
import TrophyIcon from "icons/trophy.svg?react";
import clsx from "clsx";
import { useEffect } from "react";
import fetchProfile from "features/fetchProfile";
import useUserStore from "entities/user";
import useGameStatsStore from "entities/gameStats";
import { Loading } from "widgets/loading";

export const ProfilePage = () => {
    const user_rank = "Bronze";
    const level = useUserStore((state) => state.level);
    const total_value = useGameStatsStore((state) => state.total_value);
    const total_value_next = useGameStatsStore(
        (state) => state.total_value_next
    );
    // const total_hero_values = useGameStatsStore(
    //     (state) => state.total_hero_values
    // );

    useEffect(() => {
        if (total_value === 0) fetchProfile();
    }, []);

    if (total_value === 0) return <Loading />;

    return (
        <div className={styles.container}>
            <div
                className={clsx(
                    styles.info,
                    styles[`info__${user_rank.toLowerCase()}`]
                )}
            >
                <h2 className={styles.title}>dkhstt</h2>
                <div className={styles.info_rank}>
                    <TrophyIcon className={styles.info_rank_icon} /> {level}
                </div>
                <p className={styles.info_level}>{user_rank} level</p>
            </div>
            <div
                className={clsx(
                    styles.total_skills,
                    styles[`total_skills__${user_rank.toLowerCase()}`]
                )}
            >
                <div className={styles.total_skills_top}>
                    <div className={styles.total_skills_title}>
                        Total values:
                    </div>
                    <span>
                        {total_value} / {total_value_next}
                    </span>
                </div>
                <div className={styles.total_skills_line}>
                    <div
                        className={styles.total_skills_line_inner}
                        style={{
                            width: `${(total_value / total_value_next) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
            <div className={styles.skills}></div>
        </div>
    );
};
