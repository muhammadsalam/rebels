import styles from "./styles.module.scss";

export const Loading = () => {
    return (
        <div className={styles.loading}>
            <img className={styles.img} src="/assets/loading.png" alt="REBELS" />
            {/* <h1 className={styles.title}>Rebels</h1> */}
        </div>
    );
};
