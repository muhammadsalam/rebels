import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import { Accordeon } from "widgets/accordeon";
import useHeroStore, { Card } from "entities/heroes";
import clsx from "clsx";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    activeChoosedCard?: Card | null;
    setActiveChoosedCard: Dispatch<SetStateAction<Card | null>>;
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    tempCards?: Card[];
    setChoosedCards?: Dispatch<SetStateAction<Card[]>>;
    setTeamSkills?: Dispatch<
        SetStateAction<{
            knowledge: number;
            loyalty: number;
            influence: number;
        }>
    >;
    setModalCard: Dispatch<SetStateAction<Card | null>>;
}
export const CardsPage: FC<CardProps> = ({
    activeChoosedCard = null,
    isActive,
    setIsActive,
    tempCards,
    setActiveChoosedCard,
    setChoosedCards,
    setTeamSkills,
    setModalCard,
    ...props
}) => {
    const cards = useHeroStore((state) => state.cards);
    const choosedCards = tempCards || useHeroStore((state) => state.team);

    const handleCardClick = (card: Card) => {
        // если выбранной карточки нет, то значит перешёл на страницу my_cards сразу.

        if (activeChoosedCard === null) {
            setModalCard(card);
            return;
        }

        if (activeChoosedCard.id === 0) {
            (async () => {
                const tempArr = choosedCards.map((item) =>
                    item.id === activeChoosedCard.id ? card : item
                );
                setChoosedCards && setChoosedCards(tempArr);
            })()
        }

        // проверяется нажатая карточка такая же как активная или нет И поверяется есть ли карточка в выбранных
        if (
            (activeChoosedCard.name === card.name &&
                activeChoosedCard.level === card.level) ||
            choosedCards.find(
                (item) => item.name === card.name && item.level === card.level
            )
        ) {
            return;
        } else {
            const tempArr = choosedCards.map((item) =>
                item.id === activeChoosedCard.id ? { ...card, position: activeChoosedCard.position } : item
            );
            setChoosedCards && setChoosedCards(tempArr);
            const team_skills = {
                knowledge: tempArr.reduce(
                    (summ, item) => summ + item.knowledge,
                    0
                ),
                loyalty: tempArr.reduce((summ, item) => summ + item.loyalty, 0),
                influence: tempArr.reduce(
                    (summ, item) => summ + item.influence,
                    0
                ),
            };
            setTeamSkills && setTeamSkills(team_skills);
            setIsActive(false);
            setActiveChoosedCard(null);
        }
    };

    const CardItem: FC<{ card: Card }> = ({ card, ...props }) => {
        return (
            <div
                {...props}
                className={clsx(
                    styles.item,
                    activeChoosedCard &&
                    choosedCards.find(
                        (item) =>
                            item.name === card.name &&
                            item.level === card.level
                    ) &&
                    styles.item__disabled
                )}
                key={card.id}
                onClick={() => handleCardClick(card)}
            >
                <div className={styles.item_img}>
                    <img
                        src={`${import.meta.env.VITE_API_BACK}/hero/${card.photo}`}
                        alt={card.name}
                    />
                </div>
                <div className={styles.item_info}>
                    <div className={styles.item_title}>{card.name}</div>
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
                        {card.count} pcs
                    </div>
                </div>
            </div>
        );
    };

    function getUniqueCardsByRarity(rarity: string) {
        return cards
            .filter((item) => item.rarity === rarity)
            .map((card) => <CardItem key={card.id} card={card} />);
    }

    return (
        <div {...props} className={styles.container}>
            <Modal
                onModalHide={() => setIsActive(false)}
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
                            !cards.some((item) => item.rarity === "Legend")
                        }
                    >
                        {getUniqueCardsByRarity("Legend")}
                    </Accordeon>
                    <Accordeon
                        title="Epic"
                        buttonClassName={styles[`accordeon_button__${"Epic"}`]}
                        disabled={!cards.some((item) => item.rarity === "Epic")}
                    >
                        {getUniqueCardsByRarity("Epic")}
                    </Accordeon>
                    <Accordeon
                        title="Rare"
                        buttonClassName={styles[`accordeon_button__${"Rare"}`]}
                        disabled={!cards.some((item) => item.rarity === "Rare")}
                    >
                        {getUniqueCardsByRarity("Rare")}
                    </Accordeon>
                    <Accordeon
                        title="Uncommon"
                        buttonClassName={
                            styles[`accordeon_button__${"Uncommon"}`]
                        }
                        disabled={
                            !cards.some((item) => item.rarity === "Uncommon")
                        }
                    >
                        {getUniqueCardsByRarity("Uncommon")}
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
                        {getUniqueCardsByRarity("Common")}
                    </Accordeon>
                </div>
            </Modal>
        </div>
    );
};
