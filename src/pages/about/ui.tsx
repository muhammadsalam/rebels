import { tgApp } from "shared/libs/utils";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AboutPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    return (
        <div className={styles.about}>
            <style>{"* {user-select: auto}"}</style>
            <h2 className={styles.heading}>About</h2>
            <div className={styles.inner}>
                <p className={styles.intro}>
                    Welcome to our exciting world of cryptocurrency heroes and
                    battles! In this guide, you will find all the necessary
                    information to understand the game mechanics and become a
                    master at managing your team. Study and enjoy the game!
                </p>
                <br />
                <h3 className={styles.h3}>1. Getting started</h3>
                <br />
                Your goal is to collect hero cards, fight enemies, and earn points to upgrade cards and advance through levels. As you play, you'll strengthen your team and gain access to new opportunities.

                <br />
                <br />
                <h3 className={styles.h3}>2. Hero characteristics and their impact</h3>
                <br />
                <ul className={styles.ul}>
                    <li>Knowledge: affects damage per tap and the number of points for mining. The higher the Knowledge, the faster you defeat enemies and earn more points.</li>
                    {/* <br /> */}
                    <li>Loyalty: determines how much energy is spent per tap and affects mining duration. The higher the Loyalty, the less energy is consumed.</li>
                    {/* <br /> */}
                    <li>Influence: increases the chance of a critical hit. The higher the Influence, the more often heroes will deal critical damage, helping to destroy enemies faster.</li>
                </ul>
                <br />
                How to upgrade heroes
                <br />
                <br />
                To upgrade a hero, you need to have a duplicate card and the necessary number of points to pay for the upgrade. Upgrading increases the hero's characteristics, making them stronger.
                <br />
                <br />
                Special upgrade feature for level 7 cards: When a hero reaches level 7, you can burn it along with its duplicate to obtain a random level 1 card of the next rarity.
                <br />
                <br />
                <h3 className={styles.h3}>3. Chests and their cost</h3>
                <br />
                Chests are the main way to obtain new cards of the heroes. The higher the chest level, the greater the chances of getting rare cards:
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>A Common chest contains basic hero cards</li>
                    <li>Rare, Epic, and Legendary chests give rarer and more powerful heroes</li>
                </ul>
                <br />
                Important: The price of chests increases by a fixed amount during the first 5 purchases, after which it stabilizes. This means that in the later stages of the game, the price of chests stabilizes, and you can plan your point spending more effectively.
                <br />
                <br />
                <h3 className={styles.h3}>4. Fighting enemies</h3>
                <br />
                To defeat an enemy, you form a team of 5 heroes and deal damage with taps:
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Damage per tap: depends on the total Knowledge of your team's heroes</li>
                    <li>Energy: each attack spends energy. Heroes' Loyalty reduces energy consumption, allowing for longer participation in battle.</li>
                    <li>Critical hits: the chance of a critical hit increases with growing Influence, which helps deal more damage.</li>
                </ul>
                <br />
                Form a balanced team. Use heroes with high Knowledge for increased damage and Influence for frequent critical hits. If energy runs out too quickly, add heroes with high Loyalty to reduce consumption.
                <br />
                <br />
                <h3 className={styles.h3}>5. Mining</h3>
                <br />
                Mining allows you to earn points in alongside with other activities in the game:
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Amount of mining points: depends on the team's Knowledge and Influence.</li>
                    <li>Mining duration: depends on Loyalty. The higher the Loyalty, the longer heroes can mine.</li>
                </ul>
                <br />
                <h3 className={styles.h3}>6. Account level and its impact</h3>
                <br />
                Account level grows as you upgrade your heroes. As you level up, you get more energy and access to new chests.
                <br />
                <br />
                Total volume and energy recovery per second depending on account level:
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Level 1: 20,000 energy, recovering 12 energy units per second</li>
                    <li>Level 2: 21,000 energy, recovering 14 energy units per second</li>
                    <li>Level 3: 22,000 energy, recovering 16 energy units per second</li>
                    <li>Level 4: 23,000 energy, recovering 18 energy units per second</li>
                    <li>Level 5: 24,000 energy, recovering 20 energy units per second</li>
                    <li>Level 6: 25,000 energy, recovering 22 energy units per second</li>
                    <li>Level 7: 26,000 energy, recovering 24 energy units per second</li>
                    <li>Level 8: 27,000 energy, recovering 26 energy units per second</li>
                    <li>Level 9: 28,500 energy, recovering 28 energy units per second</li>
                    <li>Level 10: 30,000 energy, recovering 30 energy units per second</li>
                </ul>
                <br />
                <h3 className={styles.h3}>7. Referral system</h3>
                <br />
                Invite friends to receive percentages of their earnings:
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Tier 1: 2% of referrals' earnings</li>
                    <li>Tier 2: 4% — 25 people</li>
                    <li>Tier 3: 6% — 225 people</li>
                    <li>Tier 4: 8% — 525 people</li>
                    <li>Tier 5: 10% — 975 people</li>
                </ul>
                <br />
                The more people you invite, the higher your referral tier and the more income you'll receive from your referrals’ activities.
                <br />
                <br />
                <h3 className={styles.h3}>Summary</h3>
                <br />
                <ul className={styles.ul}>
                    <li>Compose balanced teams for maximum damage to the enemy and conserving your own energy.</li>
                    <li>Upgrade heroes to increase account level and unlock more valuable chests.</li>
                    <li>Use mining for additional passive income.</li>
                    <li>Progress in account levels to increase energy and access to rare cards.</li>
                    <li>Invite friends to increase referral income.</li>
                </ul>

            </div>
        </div>
    );
};
