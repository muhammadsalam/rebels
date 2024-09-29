import {
    FC,
    HTMLAttributes,
    TouchEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./styles.module.scss";
import { useGameStatsStore, useTapsCounterStore, useUserStore } from "entities/user";
import clickCharacter from "features/clickCharacter";
import { seededRandom } from "shared/libs/utils";
import claim from "features/claim";
import clsx from "clsx";
import { useVillainStore } from "entities/villain/";
import useSound from "use-sound";

interface ClickPosition {
    x: number;
    y: number;
    id: number;
    damage: number;
    isCritical: boolean;
}

export const ClickableCharacter: FC<HTMLAttributes<HTMLDivElement>> = (
    props
) => {
    const [clickPositions, setClickPositions] = useState<ClickPosition[]>([]);
    const timeoutIdRef = useRef<number | null>(null);
    const nextIdRef = useRef(0);
    const claimTimeoutRef = useRef<any | null>(null);
    const damage = useGameStatsStore((state) => state.damage);
    const critical_chance = useGameStatsStore((state) => state.critical_chance);
    const taps = useTapsCounterStore((state) => state.taps);
    const seed = useTapsCounterStore((state) => state.seed);
    const current_image = useVillainStore((state) => state.current_image);

    const handleClaimTimeout = () => {
        claim().then(() => {
            claimTimeoutRef.current = null;
        });
    };

    const resetClaimTimeout = () => {
        if (claimTimeoutRef.current) {
            clearTimeout(claimTimeoutRef.current);
        }
        claimTimeoutRef.current = setTimeout(handleClaimTimeout, 2000);
    };

    const handleClick = (e: TouchEvent<HTMLDivElement>) => {
        let localTaps = taps;
        Array.from(e.changedTouches).forEach((touch) => {
            const isCritical =
                seededRandom(seed + localTaps + 1) < critical_chance / 100;
            const appliedDamage = isCritical ? damage * 2 : damage;

            const condition = clickCharacter(appliedDamage, isCritical);
            if (!condition) return;

            const target = e.target as HTMLDivElement;

            const rect = target.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const id = nextIdRef.current++;

            setClickPositions((positions) => [
                ...positions,
                { x, y, id, damage: appliedDamage, isCritical },
            ]);

            setTimeout(() => {
                setClickPositions((prev) =>
                    prev.filter((pos) => pos.id !== id)
                );
            }, 1000);

            target.classList.add(styles.wrapper__active);

            if (timeoutIdRef.current !== null) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = window.setTimeout(() => {
                target.classList.remove(styles.wrapper__active);
                timeoutIdRef.current = null;
            }, 100);

            resetClaimTimeout();
            localTaps++;
        });
    };

    const wasted = useVillainStore((state) => state.wasted);

    const [play] = useSound('/assets/sounds/wasted.mp3');
    const sounds = useUserStore(state => state.settings.sounds)
    useEffect(() => {
        wasted && sounds && play();
    }, [wasted, sounds]);

    return (
        <div
            {...props}
            className={clsx(
                styles.wrapper,
                wasted && styles.wrapper__wasted,
                wasted && styles.wrapper__active
            )}
            onTouchStartCapture={handleClick}
        >
            <strong className={styles.wasted}>wasted</strong>
            {clickPositions.map(({ x, y, id, isCritical, damage }) => (
                <div
                    key={id}
                    className={styles.point}
                    style={{
                        left: x,
                        top: y,
                        color: isCritical ? "#df2e13" : undefined,
                        fontSize: isCritical ? "60px" : undefined,
                        fontWeight: isCritical ? "700" : undefined,
                        zIndex: isCritical ? 3 : undefined,
                    }}
                >
                    {damage}
                </div>
            ))}
            <img
                src={`${import.meta.env.VITE_API_BACK}/villain/${current_image}`}
                alt="I AM VILLAIN"
                className={styles.person}
            />
        </div>
    );
};
