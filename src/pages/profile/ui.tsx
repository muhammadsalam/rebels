import styles from "./styles.module.scss";
import TrophyIcon from "icons/trophy.svg?react";
import clsx from "clsx";
import { useEffect } from "react";
import fetchProfile from "features/fetchProfile";
import useUserStore from "entities/user";
import useGameStatsStore from "entities/gameStats";
import { Loading } from "widgets/loading";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import {
    MAX_TOTAL_INFLUENCE_VALUE,
    MAX_TOTAL_KNOWLEDGE_VALUE,
    MAX_TOTAL_LOYALTY_VALUE,
} from "shared/CONSTANT";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
    const user_rank = useUserStore((state) => state.level_name);
    const level = useUserStore((state) => state.level);
    const total_value = useGameStatsStore((state) => state.total_value);
    const total_value_next = useGameStatsStore(
        (state) => state.next_level_value
    );
    const isProfileLoading = useGameStatsStore(
        (state) => state.isProfileLoading
    );
    const total_hero_values = useGameStatsStore(
        (state) => state.total_hero_values
    );

    useEffect(() => {
        fetchProfile();
    }, []);

    if (isProfileLoading) return <Loading />;

    return (
        <div className={styles.container}>
            <div
                className={clsx(
                    styles.info,
                    styles[`info__${user_rank.toLowerCase()}`]
                )}
            >
                <h2 className={styles.info_title}>dkhstt</h2>
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
            <div className={styles.skills}>
                <div className={clsx(styles.skill, styles.skill__knowledge)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SwordIcon />
                            Knowledge
                        </div>
                        <span className={styles.skill_value}>
                            {total_hero_values.knowledge}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${
                                    (total_hero_values.knowledge /
                                        MAX_TOTAL_KNOWLEDGE_VALUE) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className={clsx(styles.skill, styles.skill__loyalty)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <FlashIcon />
                            Loyalty
                        </div>
                        <span className={styles.skill_value}>
                            {total_hero_values.loyalty}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${
                                    (total_hero_values.loyalty /
                                        MAX_TOTAL_LOYALTY_VALUE) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className={clsx(styles.skill, styles.skill__influence)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SkullIcon />
                            Influence
                        </div>
                        <span className={styles.skill_value}>
                            {total_hero_values.influence}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${
                                    (total_hero_values.influence /
                                        MAX_TOTAL_INFLUENCE_VALUE) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <Link className={styles.button} to="/team" children="My team" />
        </div>
    );
};
