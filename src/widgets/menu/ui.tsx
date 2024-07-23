import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import InstagramIcon from "icons/social/instagram.svg?react";
import TelegramIcon from "icons/social/telegram.svg?react";
import TwitterIcon from "icons/social/twitter.svg?react";
import DiscordIcon from "icons/social/discord.svg?react";
import { useEffect } from "react";

export const Menu = () => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, []);

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
                <Link
                    className={styles.link}
                    to="/profile"
                    children="Daily gift"
                />
                <Link className={styles.link} to="/about" children="About" />
                <Link className={styles.link} to="/faq" children="FAQ" />
            </nav>
            <div className={styles.links}>
                <a
                    className={styles.link__icon}
                    href="https://www.instagram.com/axvaich/"
                >
                    <InstagramIcon />
                </a>
                <a className={styles.link__icon} href="https://t.me/axvaich">
                    <TelegramIcon />
                </a>
                <a className={styles.link__icon} href="https://www.x.com">
                    <TwitterIcon />
                </a>
                <a
                    className={styles.link__icon}
                    href="https://www.discord.com/"
                >
                    <DiscordIcon />
                </a>
            </div>
        </div>
    );
};
