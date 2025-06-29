import { FC, HTMLAttributes, ReactNode } from "react";
import CloseIcon from "icons/close.svg?react";
import clsx from "clsx";
import { useBodyLock } from "shared/libs/hooks";
import { Island } from "../island";
import styles from "./styles.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    onModalHide: () => void;
    heading?: ReactNode;
    subheading?: string;
    paddingTop?: number;
    paddingBottom?: number;
    innerClassName?: string;
    closeDisabled?: boolean;
    overlayClickDisabled?: boolean;
}

export const Modal: FC<ModalProps> = ({
    className,
    children,
    onModalHide,
    heading,
    subheading,
    paddingTop = 32,
    paddingBottom = '7.18vh',
    innerClassName,
    closeDisabled = false,
    overlayClickDisabled = false,
    ...props
}) => {
    useBodyLock();

    const handleOverlayClick = () => {
        if (!overlayClickDisabled) {
            onModalHide();
        }
    };

    return (
        <div className={`${styles.modal} ${className}`} {...props}>
            <div className={styles.modal_overlay} onClick={handleOverlayClick}></div>

            <div className={clsx(styles.modal_inner, innerClassName)}>
                <div
                    className={styles.wrapper}
                    style={{ paddingTop, paddingBottom }}
                >
                    {!closeDisabled && <Island tag="button" className={styles.close} onClick={onModalHide}>
                        <CloseIcon />
                    </Island>}
                    {heading && <h2 className={styles.heading}>{heading}</h2>}
                    {subheading && (
                        <p className={styles.subheading}>{subheading}</p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};
