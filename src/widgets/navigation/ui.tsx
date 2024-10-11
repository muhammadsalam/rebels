import { FC, HTMLAttributes, memo } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import TeamIcon from "icons/team.svg?react";
import ItemsIcon from "icons/items.svg?react";
import QuestsIcon from "icons/quests.svg?react";
import FriendsIcon from "icons/friends.svg?react";
import clsx from "clsx";
import { useReferralStore } from "entities/referral";

export const Navigation: FC<HTMLAttributes<HTMLDivElement>> = memo((props) => {
    const prev_level = useReferralStore(state => state.prev_level);
    const level = useReferralStore(state => state.level);

    return (
        <nav {...props} className={styles.navigation}>
            <Link className={styles.link} to="/roster">
                <div>
                    <TeamIcon />
                </div>
                <strong>Roster</strong>
            </Link>
            <Link className={styles.link} to="/shop">
                <div>
                    <ItemsIcon />
                </div>
                <strong>Shop</strong>
            </Link>
            <Link className={styles.link} to="/quests">
                <div>
                    <QuestsIcon />
                </div>
                <strong>Quests</strong>
            </Link>
            <Link className={clsx(styles.link)} to="/friends">
                <div className={clsx(styles.link_icon, prev_level !== level && styles.link_icon__active)}>
                    <FriendsIcon />
                </div>
                <strong>Friends</strong>
            </Link>
        </nav>
    );
});
