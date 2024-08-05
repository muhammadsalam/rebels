import { tgApp } from "shared/libs";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordeon } from "widgets/accordeon";

export const FAQPage = () => {
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
        <div className={styles.faq}>
            <h2 className={styles.heading}>FAQ</h2>
            <Accordeon
                title="How to start playing?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Starting the game is very simple! Upon first entering the game,
                every new player receives 5 level 1 Common cards. Use them to
                form your initial team and begin your journey in the world of
                crypto heroes.
            </Accordeon>

            <Accordeon
                title="How to level up cards?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                To level up a card, you need another identical card and enough
                points. Combine the cards to enhance their characteristics. For
                example, combining two level 3 Epic cards with a level 1 Epic
                card will give you a level 4 Epic card. If you have a level 7
                Epic card and a level 1 Epic card, combining them will result in
                a random higher rarity card (Legendary) of level 1.
            </Accordeon>

            <Accordeon
                title="What is energy and how is it used?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Energy is required to perform actions in the game, such as
                attacking enemies. Each tap on the screen costs 100 energy
                points. The Loyalty of your cards can reduce this cost.
            </Accordeon>

            <Accordeon
                title="How to get new cards?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                New cards can be obtained by opening chests, which are purchased
                with points. The higher the rarity of the chest, the better the
                cards you can get from it.
            </Accordeon>

            <Accordeon
                title="How does the chest system work?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Chests contain cards of various rarities. The cost of chests
                increases with each opening by a certain percentage depending on
                the rarity. For example, after purchasing one Common chest, its
                cost will increase.
            </Accordeon>

            <Accordeon
                title="What types of cards are there and how do they differ?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Cards are divided by rarity into Common, Uncommon, Rare, Epic,
                and Legendary. Each rarity level affects the card's base
                characteristics and its upgrade potential.
            </Accordeon>

            <Accordeon
                title="How to get rare cards?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Rare cards can be obtained from chests of the corresponding
                rarity or by upgrading lower rarity cards. Higher rarity chests
                are more expensive, but the chance of getting rare cards from
                them is higher.
            </Accordeon>

            <Accordeon
                title="How do character levels affect battle?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Character levels directly affect their combat characteristics.
                Higher levels increase the damage characters can deal, as well
                as their abilities to reduce energy consumption and increase
                critical hit chances.
            </Accordeon>

            <Accordeon
                title="How to develop your account and what does it give?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Account leveling occurs by leveling up cards. Each account level
                increases the maximum energy capacity and the speed of energy
                recovery. For example, starting with 20,000 energy units and 12
                units per second, you can increase these values by leveling up
                your account through card upgrades.
            </Accordeon>

            <Accordeon
                title="How do card characteristics work?"
                textStyles={{ fontSize: "18px", color: "var(--gray)" }}
                arrowStyles={{ flexGrow: 1, maxWidth: 24, width: "100%" }}
            >
                Each card has the characteristics Knowledge, Loyalty, and
                Influence. Knowledge increases the amount of points earned from
                actions. Loyalty reduces the energy cost of actions. Influence
                can increase the chances of a critical hit in battle.
            </Accordeon>
        </div>
    );
};
