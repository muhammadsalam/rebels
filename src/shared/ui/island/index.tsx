import clsx from "clsx";
import { FC, HTMLAttributes, memo } from "react";
import styles from './style.module.scss';
import { LinkProps } from "react-router-dom";

export const Island: FC<{
    tag?: any,
    href?: string,
    disabled?: true | false,
} & (LinkProps | HTMLAttributes<HTMLDivElement>)> = memo(({ tag: Tag = 'div', children, className, ...props }) => {
    return (
        <Tag className={clsx(className, styles.island)} {...props}>
            {children}
        </Tag>
    );
})