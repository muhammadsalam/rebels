import { tgApp } from "shared/libs";
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
                <h3 className={styles.h3}>1. Getting Started</h3>
                <br />
                Characters and Cards
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>
                        Characters: the game features 30 unique characters, each
                        of whom has contributed to the world of cryptocurrency.
                        Characters are divided into 5 rarities: Common,
                        Uncommon, Rare, Epic, and Legendary.
                    </li>
                    <br />
                    <li>
                        Cards: each character is represented as a card that can
                        be upgraded to enhance the character's abilities. Card
                        upgrades are done by merging identical cards and using
                        game points.
                    </li>
                </ul>
                <br />
                Starting team
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>
                        New players start with 5 identical level 1 Common cards.
                        You can upgrade them, obtain new cards, and create your
                        ideal team.
                    </li>
                </ul>
                <br />
                <h3 className={styles.h3}>2. Energy and battle</h3>
                <br />
                Energy
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>
                        Base energy consumption: each action in the game
                        requires 100 energy units, which you spend with each
                        "tap."
                    </li>
                    <br />
                    <li>
                        Loyalty influence: the higher the Loyalty of the
                        character, the less energy is required for their
                        actions.
                    </li>
                </ul>
                <br />
                Damage and tap
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Base damage per tap depends on the card rarity:</li>
                    <ul>
                        <li>Common: 10 damage.</li>
                        <li>Uncommon: 20 damage.</li>
                        <li>Rare: 30 damage.</li>
                        <li>Epic: 40 damage.</li>
                        <li>Legendary: 50 damage.</li>
                    </ul>
                </ul>
                <br />
                <h3 className={styles.h3}>3. Chests and rewards</h3>
                <br />
                Types of chests
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>Initial chest costs:</li>
                    <ul>
                        <li>Common: 20.000 points</li>
                        <li>Uncommon: 50.000 points</li>
                        <li>Rare: 100.000 points</li>
                        <li>Epic: 150.000 points</li>
                        <li>Legendary: 250.000 points</li>
                    </ul>
                </ul>
                <br />
                <ul className={styles.ul}>
                    <li>Chest price increase:</li>
                    <ul>
                        <li>Level 1 Chest - 10%</li>
                        <li>Level 2 Chest - 10%</li>
                        <li>Level 3 Chest - 15%</li>
                        <li>Level 4 Chest - 15%</li>
                        <li>Level 5 Chest - 20%</li>
                    </ul>
                </ul>
                <br />
                Opening chests
                <br />
                <br />
                <ul className={styles.ul}>
                    <li>
                        Players earn points in battles and can spend them to
                        purchase chests. With each opening, the cost of the next
                        chest increases, so choose wisely!
                    </li>
                </ul>
                <br />
                <h3 className={styles.h3}>4. Card Upgrades</h3>
                <br />
                Upgrading
                <br />
                <br />
                To upgrade a card, you need to combine it with another identical
                card. For example, if you have a level 3 Epic card and a level 1
                Epic card, combining them will give you a level 4 Epic card.
                <br />
                <br />
                Upgrading cards of level 7: if you have a level 7 Common card
                and a level 1 Common card, they can be burned for free to
                receive a random level 1 card of the next rarity (in this case,
                Uncommon).
                <br />
                <br />
                Upgrade costs
                <br />
                <br />
                Common
                <ul className={styles.ul}>
                    <li>Level 1 -{">"} Level 2: 15.000 points</li>
                    <li>Level 2 -{">"} Level 3: 18.750 points</li>
                    <li>Level 3 -{">"} Level 4: 23.500 points </li>
                    <li>Level 4 -{">"} Level 5: 29.500 points</li>
                    <li>Level 5 - {">"} Level 6: 36.700 points</li>
                    <li>Level 6 -{">"} Level 7: 45.800 points</li>
                </ul>
                <br />
                Uncommon
                <ul className={styles.ul}>
                    <li>Level 1 -{">"} Level 2: 37.500 points</li>
                    <li>Level 2 -{">"} Level 3: 46.900 points</li>
                    <li>Level 3 -{">"} Level 4: 58.600 points</li>
                    <li>Level 4 -{">"} Level 5: 73.300 points</li>
                    <li>Level 5 -{">"} Level 6: 91.600 points</li>
                    <li>Level 6 -{">"} Level 7: 114.500 points</li>
                </ul>
                <br />
                Rare
                <ul className={styles.ul}>
                    <li>Level 1 -{">"} Level 2: 75.000 points</li>
                    <li>Level 2 -{">"} Level 3: 93.750 points</li>
                    <li>Level 3 -{">"} Level 4: 117.100 points</li>
                    <li>Level 4 -{">"} Level 5: 146.500 points</li>
                    <li>Level 5 -{">"} Level 6: 183.200 points</li>
                    <li>Level 6 -{">"} Level 7: 228.900 points</li>
                </ul>
                <br />
                Epic
                <ul className={styles.ul}>
                    <li>Level 1 -{">"} Level 2: 112.500 points</li>
                    <li>Level 2 -{">"} Level 3: 140.700 points</li>
                    <li>Level 3 -{">"} Level 4: 175.800 points</li>
                    <li>Level 4 -{">"} Level 5: 219.800 points</li>
                    <li>Level 5 -{">"} Level 6: 274.700 points</li>
                    <li>Level 6 -{">"} Level 7: 343.400 points</li>
                </ul>
                <br />
                Legendary
                <ul className={styles.ul}>
                    <li>Level 1 -{">"} Level 2: 150.000 points</li>
                    <li>Level 2 -{">"} Level 3: 187.500 points</li>
                    <li>Level 3 -{">"} Level 4: 234.400 points</li>
                    <li>Level 4 -{">"} Level 5: 293.000 points</li>
                    <li>Level 5 -{">"} Level 6: 366.400 points</li>
                    <li>Level 6 -{">"} Level 7: 458.000 points</li>
                </ul>
                <br />
                <h3 className={styles.h3}>5. Account development</h3>
                <br />
                Account level
                <br />
                <br />
                The account level is determined by the total experience of all
                cards and affects the volume and recovery speed of energy.
                <br />
                <br />
                Levels and their characteristics:
                <ul className={styles.ul}>
                    <li>
                        Level 1: 0-95 experience, 12 units per second, 20.000
                        energy
                    </li>
                    <li>
                        Level 2: 96-199 experience, 14 units per second, 21.000
                        energy
                    </li>
                    <li>
                        Level 3: 200-349 experience, 16 units per second, 22.000
                        energy
                    </li>
                    <li>
                        Level 4: 350-529 experience, 18 units per second, 23.000
                        energy
                    </li>
                    <li>
                        Level 5: 530-749 experience, 20 units per second, 24.000
                        energy
                    </li>
                    <li>
                        Level 6: 750-1009 experience, 22 units per second,
                        25.000 energy
                    </li>
                    <li>
                        Level 7: 1010-1309 experience, 24 units per second,
                        26.000 energy
                    </li>
                    <li>
                        Level 8: 1310-1649 experience, 26 units per second,
                        27.000 energy
                    </li>
                    <li>
                        Level 9: 1650-2030 experience, 28 units per second,
                        28.500 energy
                    </li>
                    <li>
                        Level 10: 2031+ experience, 30 units per second, 30.000
                        energy
                    </li>
                </ul>
                <br />
                <h3 className={styles.h3}>6. Strategies and tips</h3>
                <br />
                <ul className={styles.ul}>
                    <li>
                        Balanced team: choose characters with different skills
                        and levels.
                    </li>
                    <br />
                    <li>
                        Smart investments: decide which cards to upgrade and
                        when to buy chests.
                    </li>
                    <br />
                    <li>
                        Play regularly: the more active you are, the faster you
                        can accumulate points and progress in the game.
                    </li>
                </ul>
            </div>
        </div>
    );
};
