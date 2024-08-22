import { useEffect } from 'react';
import styles from './style.module.scss'

export const AutoRotate = () => {
    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = bodyOverflow;
        };
    }, [])
    return (
        <div className={styles.rotate}>
            <div className={styles.rotate_block}>
                <svg width="72" height="35" viewBox="0 0 72 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9632 0H10.5002V3.5679H13.9632V7.1358H3.57429V10.7037H0.111328V28.5432H3.57429V32.1111H7.03725V28.5432H3.57429V10.7037H13.9632V14.2716H10.5002V17.8395H13.9632V14.2716H17.4261V10.7037H20.8891V7.1358H17.4261V3.5679H13.9632V0Z" fill="#B6B6B6" />
                    <path d="M24.667 0H47.3337V34H24.667V0ZM43.5559 30.2222V3.77778H39.7781V7.55556H32.2225V3.77778H28.4448V30.2222H43.5559ZM34.1114 22.6667H37.8892V26.4444H34.1114V22.6667Z" fill="#B6B6B6" />
                    <path d="M58.0368 34H61.4998V30.4321H58.0368V26.8642H68.4257V23.2963H71.8887V5.45679H68.4257V1.88889H64.9627V5.45679H68.4257V23.2963H58.0368V19.7284H61.4998V16.1605H58.0368V19.7284H54.5739V23.2963H51.1109V26.8642H54.5739V30.4321H58.0368V34Z" fill="#B6B6B6" />
                </svg>

                <p>
                    Turn the phone upright
                </p>

            </div>
        </div>
    );
}