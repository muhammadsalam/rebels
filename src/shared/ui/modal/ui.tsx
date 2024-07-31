import {
    Dispatch,
    FC,
    HTMLAttributes,
    ReactNode,
    SetStateAction,
    useEffect,
} from "react";
import styles from "./styles.module.scss";
import CloseIcon from "icons/close.svg?react";
import clsx from "clsx";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    heading?: ReactNode;
    subheading?: string;
    paddingTop?: number;
    paddingBottom?: number;
    innerClassName?: string;
}

export const Modal: FC<ModalProps> = ({
    isActive,
    className,
    children,
    setIsActive,
    heading,
    subheading,
    paddingTop = 32,
    paddingBottom = 57,
    innerClassName,
    ...props
}) => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, []);

    const handleModalHide = () => {
        setIsActive(false);
    };

    return (
        <div className={`${styles.modal} ${className}`} {...props}>
            <div
                className={styles.modal_overlay}
                onClick={handleModalHide}
            ></div>

            <div
                className={clsx(styles.modal_inner, innerClassName)}
                style={{ paddingTop, paddingBottom }}
            >
                <button className={styles.close} onClick={handleModalHide}>
                    <CloseIcon />
                </button>
                {heading && <h2 className={styles.heading}>{heading}</h2>}
                {subheading && (
                    <p className={styles.subheading}>{subheading}</p>
                )}
                {children}
            </div>
        </div>
    );
};
