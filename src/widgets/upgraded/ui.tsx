import { FC, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import { useBodyLock } from 'shared/libs/hooks';

interface UpgradedProps extends HTMLAttributes<HTMLDivElement> {
    onModalHide: () => void;
    info: {
        name: string;
        level: number;
    }
}

export const Upgraded: FC<UpgradedProps> = ({ onModalHide, info, ...props }) => {
    useBodyLock();

    return (
        <div {...props} className={styles.upgraded}>
            <div className={styles.upgraded_overlay}></div>
            <div className={styles.upgraded_block}>
                <div className={styles.overflow}>
                    <strong className={styles.upgraded_name}>{info.name}</strong>
                </div>
                <strong className={styles.upgraded_text}>upgraded</strong>
                <div className={styles.overflow}>
                    <span className={styles.upgraded_span}>level {info.level}</span>
                </div>
            </div>
        </div>
    );
}