import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Typed from 'typed.js';

export const Loading = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(textRef.current, {
            startDelay: 1100,
            strings: ["Despite everything, there is calculation in all chaos."],
            typeSpeed: 30,
            // onTypingPaused: () => {
            //     alert('onTypingPaused');
            // },
            // onTypingResumed: () => {
            //     alert('onTypingResumed');
            // },
            // onReset: () => {
            //     alert('onReset');
            // },
            // onComplete: () => {
            //     alert('onComplete');
            // },
            // onStart: () => {
            //     alert('onStart');
            // },
            // onBegin: () => {
            //     alert('onBegin');
            // },
            // onLastStringBackspaced: () => {
            //     alert('onLastStringBackspaced');
            // },
        });

        return () => typed.destroy();
    }, [])

    return (
        <div className={styles.loading}>
            <div className={styles.block}>
                *
                <div>
                    <p ref={textRef}></p>
                </div>
            </div>
        </div>
    );
};
