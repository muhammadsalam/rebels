import { FC, HTMLAttributes, useEffect } from 'react';
import styles from './style.module.scss';

interface UpgradedProps extends HTMLAttributes<HTMLDivElement> {
    onModalHide: () => void;
    info: {
        name: string;
        level: number;
    }
}

export const Upgraded: FC<UpgradedProps> = ({ onModalHide, info, ...props }) => {

    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, [])

    return (
        <div {...props} className={styles.upgraded}>
            <div className={styles.upgraded_overlay} onClick={onModalHide}></div>
            <div className={styles.upgraded_block}>
                <div className={styles.overflow}>
                    <strong className={styles.upgraded_name}>{info.name}</strong>
                </div>
                <img className={styles.upgraded_img} src="/assets/upgraded.png" alt="UPGRADED" />
                <div className={styles.overflow}>
                    <span className={styles.upgraded_span}>level {info.level}</span>
                </div>
            </div>
        </div>
    );
}