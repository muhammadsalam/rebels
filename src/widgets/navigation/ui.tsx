import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import TeamIcon from "icons/team.svg?react";
import ItemsIcon from "icons/items.svg?react";
import QuestsIcon from "icons/quests.svg?react";
import FriendsIcon from "icons/friends.svg?react";

export const Navigation: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <nav {...props} className={styles.navigation}>
            <Link className={styles.link} to="/team">
                <TeamIcon />
                <strong>Team</strong>
            </Link>
            <Link className={styles.link} to="/shop">
                <ItemsIcon />
                <strong>Shop</strong>
            </Link>
            <Link className={styles.link} to="/quests">
                <QuestsIcon />
                <strong>Quests</strong>
            </Link>
            <Link className={styles.link} to="/friends">
                <FriendsIcon />
                <strong>Friends</strong>
            </Link>
        </nav>
    );
};
