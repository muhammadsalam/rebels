import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import { FC, HTMLAttributes, useState } from "react";
import { Accordeon } from "widgets/accordeon";
import useHeroStore, { Card } from "entities/heroes";
import clsx from "clsx";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    activeChoosedCard?: Card | null;
}
export const CardsPage: FC<CardProps> = ({
    activeChoosedCard = null,
    ...props
}) => {
    const [isActive, setisActive] = useState(true);

    const cards = useHeroStore((state) => state.cards);
    const choosedCards = useHeroStore((state) => state.team);

    const handleCardClick = (card: Card) => {};

    const CardItem: FC<{ card: Card }> = ({ card, ...props }) => {
        return (
            <div {...props} className={styles.item} key={card.id}>
                <div className={styles.item_img}>
                    <img src="/assets/card-item.png" alt={card.name} />
                </div>
                <div className={styles.item_info}>
                    <div
                        className={clsx(
                            styles.item_title,
                            activeChoosedCard &&
                                choosedCards.find(
                                    (item) => item.id === card.id
                                ) &&
                                styles.item_title__used
                        )}
                    >
                        {card.name}
                    </div>
                    <div className={styles.item_skills}>
                        <div className={styles.item_skills_block}>
                            <SwordIcon
                                className={
                                    styles.item_skills_block_icon__knowledge
                                }
                            />
                            {card.knowledge}
                        </div>
                        <div className={styles.item_skills_block}>
                            <FlashIcon
                                className={
                                    styles.item_skills_block_icon__loyalty
                                }
                            />
                            {card.loyalty}
                        </div>
                        <div className={styles.item_skills_block}>
                            <SkullIcon
                                className={
                                    styles.item_skills_block_icon__influence
                                }
                            />
                            {card.influence}
                        </div>
                    </div>
                </div>
                <div className={styles.item_counter}>
                    <div className={styles.item_level}>
                        {`${card.level} lvl`}
                    </div>
                    <div className={styles.item_count}>
                        {`${
                            cards.filter((item) => item.id === card.id).length
                        } pcs`}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div {...props} className={styles.container}>
            {isActive && (
                <Modal
                    isActive={isActive}
                    setIsActive={setisActive}
                    className={styles.modal}
                    innerClassName={styles.modal_inner}
                    paddingTop={20}
                    paddingBottom={20}
                >
                    <h2 className={styles.heading}>My cards</h2>
                    <div className={styles.cards}>
                        <Accordeon
                            title="Legendary"
                            buttonClassName={
                                styles[`accordeon_button__${"Legendary"}`]
                            }
                            disabled={
                                !cards.some(
                                    (item) => item.rarity === "Legendary"
                                )
                            }
                        >
                            {cards
                                .filter((item) => item.rarity === "Legendary")
                                .reduce<Card[]>(
                                    (items, item) =>
                                        items.some(
                                            (card) =>
                                                card.id === item.id &&
                                                card.level === item.level
                                        )
                                            ? items
                                            : items.concat([item]),
                                    []
                                )
                                .map((card) => (
                                    <CardItem key={card.id} card={card} />
                                ))}
                        </Accordeon>
                        <Accordeon
                            title="Epic"
                            buttonClassName={
                                styles[`accordeon_button__${"Epic"}`]
                            }
                            disabled={
                                !cards.some((item) => item.rarity === "Epic")
                            }
                        >
                            {cards
                                .filter((item) => item.rarity === "Epic")
                                .reduce<Card[]>(
                                    (items, item) =>
                                        items.some(
                                            (card) =>
                                                card.id === item.id &&
                                                card.level === item.level
                                        )
                                            ? items
                                            : items.concat([item]),
                                    []
                                )
                                .map((card) => (
                                    <CardItem key={card.id} card={card} />
                                ))}
                        </Accordeon>
                        <Accordeon
                            title="Rare"
                            buttonClassName={
                                styles[`accordeon_button__${"Rare"}`]
                            }
                            disabled={
                                !cards.some((item) => item.rarity === "Rare")
                            }
                        >
                            {cards
                                .filter((item) => item.rarity === "Rare")
                                .reduce<Card[]>(
                                    (items, item) =>
                                        items.some(
                                            (card) =>
                                                card.id === item.id &&
                                                card.level === item.level
                                        )
                                            ? items
                                            : items.concat([item]),
                                    []
                                )
                                .map((card) => (
                                    <CardItem key={card.id} card={card} />
                                ))}
                        </Accordeon>
                        <Accordeon
                            title="Uncommon"
                            buttonClassName={
                                styles[`accordeon_button__${"Uncommon"}`]
                            }
                            disabled={
                                !cards.some(
                                    (item) => item.rarity === "Uncommon"
                                )
                            }
                        >
                            {cards
                                .filter((item) => item.rarity === "Uncommon")
                                .reduce<Card[]>(
                                    (items, item) =>
                                        items.some(
                                            (card) =>
                                                card.id === item.id &&
                                                card.level === item.level
                                        )
                                            ? items
                                            : items.concat([item]),
                                    []
                                )
                                .map((card) => (
                                    <CardItem key={card.id} card={card} />
                                ))}
                        </Accordeon>
                        <Accordeon
                            title="Common"
                            buttonClassName={
                                styles[`accordeon_button__${"Common"}`]
                            }
                            disabled={
                                !cards.some((item) => item.rarity === "Common")
                            }
                        >
                            {cards
                                .filter((item) => item.rarity === "Common")
                                .reduce<Card[]>(
                                    (items, item) =>
                                        items.some(
                                            (card) =>
                                                card.id === item.id &&
                                                card.level === item.level
                                        )
                                            ? items
                                            : items.concat([item]),
                                    []
                                )
                                .map((card) => (
                                    <CardItem key={card.id} card={card} />
                                ))}
                        </Accordeon>
                    </div>
                </Modal>
            )}
        </div>
    );
};
