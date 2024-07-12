import { FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import MineIcon from "icons/mine.svg?react";
import ItemsIcon from "icons/items.svg?react";
import QuestsIcon from "icons/quests.svg?react";
import FriendsIcon from "icons/friends.svg?react";

export const Navigation: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <nav {...props} className={styles.navigation}>
            <Link className={styles.link} to="/mine">
                <MineIcon />
                <strong>Mine</strong>
            </Link>
            <Link className={styles.link} to="/items">
                <ItemsIcon />
                <strong>Items</strong>
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
