import { Modal } from "shared/ui";
import styles from "./styles.module.scss";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import { Accordeon } from "widgets/accordeon";
import { useHeroStore, Card } from "entities/heroes";
import clsx from "clsx";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import { useUserStore } from "entities/user";
import useSound from "use-sound";

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
    const balance = useUserStore(state => state.balance)
    const sounds = useUserStore(state => state.settings.sounds)

    const [playClickSound] = useSound('/assets/sounds/card_change.mp3');
    const handleCardClick = (card: Card) => {
        sounds && playClickSound()
        // если выбранной карточки нет, то значит перешёл на страницу my_cards сразу.

        if (activeChoosedCard === null) {
            setModalCard(card);
            return;
        }

        if (activeChoosedCard.id === 0) {
            const tempArr = choosedCards.map((item) =>
                item.id === activeChoosedCard.id ? card : item
            );
            setChoosedCards && setChoosedCards(tempArr);
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
                {(card.level < 7 && card.rarity === 'Legend' || card.rarity !== 'Legend') && card.count > 1 && balance >= card.upgrade_price && <svg className={styles.item_upgrading} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.8" d="M6.2 1.4001H7.6V2.8001H9V1.4001H7.6V9.77516e-05H6.2V1.4001H4.8V2.8001H6.2V1.4001ZM3.4 4.2001V2.8001H4.8V4.2001H3.4ZM3.4 4.2001V5.6001H2V4.2001H3.4ZM10.4 4.2001V2.8001H9V4.2001H10.4ZM10.4 4.2001V5.6001H11.8V4.2001H10.4Z" fill="#C4EB2A" />
                    <path opacity="0.5" d="M6.2 5.5998H7.6V6.9998H9V5.5998H7.6V4.1998H6.2V5.5998H4.8V6.9998H6.2V5.5998ZM3.4 8.3998V6.9998H4.8V8.3998H3.4ZM3.4 8.3998V9.7998H2V8.3998H3.4ZM10.4 8.3998V6.9998H9V8.3998H10.4ZM10.4 8.3998V9.7998H11.8V8.3998H10.4Z" fill="#C4EB2A" />
                    <path opacity="0.3" d="M6.2 9.8H7.6V11.2H9V9.8H7.6V8.4H6.2V9.8H4.8V11.2H6.2V9.8ZM3.4 12.6V11.2H4.8V12.6H3.4ZM3.4 12.6V14H2V12.6H3.4ZM10.4 12.6V11.2H9V12.6H10.4ZM10.4 12.6V14H11.8V12.6H10.4Z" fill="#C4EB2A" />
                </svg>}
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
