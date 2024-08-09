import { FC, HTMLAttributes, ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import ArrowDownIcon from "icons/arrow-down.svg?react";

interface AccordeonProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    isAccordActive?: boolean;
    disabled?: boolean;
    children: ReactNode;
    buttonClassName?: string;
    arrowStyles?: React.CSSProperties;
    textStyles?: React.CSSProperties;
}

export const Accordeon: FC<AccordeonProps> = ({
    title,
    isAccordActive = false,
    disabled = false,
    children,
    buttonClassName,
    arrowStyles,
    textStyles,
    ...props
}) => {
    const [isActive, setIsActive] = useState(isAccordActive);

    const handleAccordionClick = () => {
        setIsActive((state) => !state);
    };

    return (
        <div
            {...props}
            className={clsx(
                styles.accordeon,
                disabled && styles.accordeon__disabled,
                isActive && styles.accordeon__active
            )}
        >
            <div
                className={clsx(styles.accordeon_button, buttonClassName)}
                onClick={() => handleAccordionClick()}
            >
                {title}
                <ArrowDownIcon
                    style={arrowStyles}
                    className={styles.accordeon_button_icon}
                />
            </div>
            <div className={styles.accordeon_list}>
                <div
                    style={textStyles}
                    className={styles.accordeon_list_wrapper}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
