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

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    heading: ReactNode;
    subheading?: string;
}

export const Modal: FC<ModalProps> = ({
    isActive,
    className,
    children,
    setIsActive,
    heading,
    subheading,
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
            <button className={styles.close} onClick={handleModalHide}>
                <CloseIcon />
            </button>
            <div className={styles.modal_inner}>
                {heading && <h2 className={styles.heading}>{heading}</h2>}
                {subheading && (
                    <p className={styles.subheading}>{subheading}</p>
                )}
                {children}
            </div>
        </div>
    );
};
