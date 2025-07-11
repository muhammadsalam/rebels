import styles from "./styles.module.scss";
import TrophyIcon from "icons/trophy.svg?react";
import clsx from "clsx";
import { useGameStatsStore, useUserStore } from "entities/user/";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import { Line } from "shared/ui";
import { useBackButton } from "shared/libs/hooks";

export const ProfilePage = () => {
    useBackButton();

    const user_rank = useUserStore((state) => state.level_name);
    const level = useUserStore((state) => state.level);
    const total_value = useGameStatsStore((state) => state.total_value);
    const name = useUserStore((state) => state.name);
    const total_value_next = useGameStatsStore(
        (state) => state.next_level_value
    );
    const total_value_start = useGameStatsStore(
        (state) => state.start_level_value
    );
    const total_values = useGameStatsStore(
        (state) => state.total_values
    );
    const max_total_values = useGameStatsStore(
        (state) => state.max_total_values
    );

    return (
        <div className={styles.container}>
            <div
                className={clsx(
                    styles.info,
                    styles[`info__${user_rank.toLowerCase()}`]
                )}
            >
                <h2 className={styles.info_title}>{name}</h2>
                <div className={styles.info_rank}>
                    <TrophyIcon className={styles.info_rank_icon} /> {level}
                </div>
                <p className={styles.info_level}>{user_rank}</p>
            </div>
            <div
                className={clsx(
                    styles.total_skills,
                    styles[`total_skills__${user_rank.toLowerCase()}`]
                )}
            >
                <div className={styles.total_skills_top}>
                    <div className={styles.total_skills_title}>
                        Total power:
                    </div>
                    <span>
                        {total_value} {total_value_next && `/ ${total_value_next}`}
                    </span>
                </div>
                <Line
                    className={styles.total_skills_line}
                    width={total_value_next ? ((total_value - total_value_start) / (total_value_next - total_value_start)) * 100 : 100}
                    height={9}
                />
            </div>
            <div className={styles.skills}>
                <div className={clsx(styles.skill, styles.skill__knowledge)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SwordIcon />
                            Knowledge
                        </div>
                        <span className={styles.skill_value}>
                            {total_values.knowledge}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        width={(total_values.knowledge / max_total_values.knowledge) * 100}
                        height={2}
                    />
                </div>
                <div className={clsx(styles.skill, styles.skill__loyalty)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <FlashIcon />
                            Loyalty
                        </div>
                        <span className={styles.skill_value}>
                            {total_values.loyalty}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        width={(total_values.loyalty / max_total_values.loyalty) * 100}
                        height={2}
                    />
                </div>
                <div className={clsx(styles.skill, styles.skill__influence)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SkullIcon />
                            Influence
                        </div>
                        <span className={styles.skill_value}>
                            {total_values.influence}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        width={(total_values.influence / max_total_values.influence) * 100}
                        height={2}
                    />
                </div>
            </div>
        </div>
    );
};
