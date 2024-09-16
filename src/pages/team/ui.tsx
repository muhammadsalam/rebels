import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { saveTeam, Card, upgradeHero, useHeroStore } from "entities/heroes";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Island, Line, Modal } from "shared/ui";
import { formatNumber, tgApp } from "shared/libs/utils";
import { useUserStore } from "entities/user";
import { CardsPage } from "pages/cards";
import { Upgraded } from "widgets/upgraded";
import {
    MAX_CARD_INFLUENCE,
    MAX_CARD_KNOWLEDGE,
    MAX_CARD_LOYALTY,
} from "shared/CONSTANT";
import styles from "./styles.module.scss";
import useSound from "use-sound";


export const TeamPage = () => {
    const team = useHeroStore((state) => state.team);
    const [team_skills, setTeamSkills] = useState(
        useHeroStore((state) => state.team_skills)
    );
    const max_team_skills = useHeroStore((state) => state.max_team_skills);
    const [activeChoosedCard, setActiveChoosedCard] = useState<Card | null>(
        null
    );
    const [modalCard, setModalCard] = useState<Card | null>(
        null
    );
    const [choosedCards, setChoosedCards] = useState(team);
    const balance = useUserStore.getState().balance;

    const [isCardsGalleryActive, setIsCardsGalleryActive] = useState(false);
    // const handleCardsGalleryPage = () => {};
    const [upgradedCard, setUpgradedCard] = useState<null | { name: string, level: number }>(null);

    const sounds = useUserStore(state => state.settings.sounds)
    const [playClickSound] = useSound('/assets/sounds/click.mp3');
    const handleCardClick = (card: Card) => {
        sounds && playClickSound();

        if (card.id !== 0) {
            setActiveChoosedCard(card);
            setModalCard(card);
            return;
        }

        setIsCardsGalleryActive(true);
        setActiveChoosedCard(card);

    };

    const hasChanges = () => {
        let hasChange = false;

        for (let i = 0; i < choosedCards.length; i++) {
            if (!team.find((item) => item.id === choosedCards[i].id)) {
                hasChange = true;
                break;
            }
        }

        return hasChange;
    };

    const handleSaveTeam = async () => {
        let changed = true;

        if (hasChanges()) {
            let teamKnowledge = 0,
                teamLoyalty = 0,
                teamInfluence = 0;

            choosedCards.forEach((item) => {
                teamKnowledge += item.knowledge;
                teamLoyalty += item.loyalty;
                teamInfluence += item.influence;
            });

            useHeroStore.setState({
                team_skills: {
                    knowledge: teamKnowledge,
                    loyalty: teamLoyalty,
                    influence: teamInfluence,
                },
            });

            await saveTeam(choosedCards)

            changed = true;
        }

        return changed;
    };

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

    const [playUpgradeAudio] = useSound('/assets/sounds/upgrade.mp3');
    const [isUpgrading, setIsUpgrading] = useState(false);
    const handleUpgradeCard = async (hero_id: number) => {
        setIsUpgrading(true);
        let savedCondition: any = true;

        savedCondition = await handleSaveTeam();
        console.log(savedCondition);

        const upgrade_data = await upgradeHero(hero_id);
        setIsUpgrading(false);

        if (upgrade_data) {
            sounds && playUpgradeAudio();
            setActiveChoosedCard(null);
            setModalCard(null);
            setChoosedCards(upgrade_data.upgraded_team);

            setUpgradedCard({ name: upgrade_data.upgradedCard.name, level: upgrade_data?.upgradedCard.level });
            setTimeout(() => {
                setUpgradedCard(null);
            }, 2000);
        }
    };

    const handleChange = () => {
        sounds && playClickSound();
        setIsCardsGalleryActive(true);
        setModalCard(null);
    }

    const handleMyCardsClick = useCallback(() => {
        sounds && playClickSound();
        setIsCardsGalleryActive(true)
    }, [playClickSound, sounds]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>Roster</h2>
                </div>
            </div>

            <div className={styles.choosed_cards}>
                {choosedCards.map((_, index, cardsArray) => {
                    let item = cardsArray.find(item => item.position === index);

                    if (item === undefined) item = {
                        id: 0,
                        level: 0,
                        count: 0,
                        photo: "",
                        knowledge_step: 0,
                        loyalty_step: 0,
                        influence_step: 0,
                        position: index,
                        influence: 0,
                        knowledge: 0,
                        loyalty: 0,
                        name: "",
                        rarity: "Common",
                        upgrade_price: 0,
                    }

                    return (
                        <div
                            className={clsx(
                                styles.card,
                                activeChoosedCard?.id === item?.id &&
                                styles.card__active
                            )}
                            key={'main_cards_' + item?.id + index}
                            onClick={() => handleCardClick((item as Card))}
                        >
                            {item?.id === 0 ? (
                                "+"
                            ) : (
                                <>
                                    {(item.level < 7 && item.rarity === 'Legend' || item.rarity !== 'Legend') && item.count > 1 && balance >= item.upgrade_price && <svg className={styles.card_upgrading} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.3" d="M6.2 1.4001H7.6V2.8001H9V1.4001H7.6V9.77516e-05H6.2V1.4001H4.8V2.8001H6.2V1.4001ZM3.4 4.2001V2.8001H4.8V4.2001H3.4ZM3.4 4.2001V5.6001H2V4.2001H3.4ZM10.4 4.2001V2.8001H9V4.2001H10.4ZM10.4 4.2001V5.6001H11.8V4.2001H10.4Z" fill="#C4EB2A" />
                                        <path opacity="0.5" d="M6.2 5.5998H7.6V6.9998H9V5.5998H7.6V4.1998H6.2V5.5998H4.8V6.9998H6.2V5.5998ZM3.4 8.3998V6.9998H4.8V8.3998H3.4ZM3.4 8.3998V9.7998H2V8.3998H3.4ZM10.4 8.3998V6.9998H9V8.3998H10.4ZM10.4 8.3998V9.7998H11.8V8.3998H10.4Z" fill="#C4EB2A" />
                                        <path opacity="0.8" d="M6.2 9.8H7.6V11.2H9V9.8H7.6V8.4H6.2V9.8H4.8V11.2H6.2V9.8ZM3.4 12.6V11.2H4.8V12.6H3.4ZM3.4 12.6V14H2V12.6H3.4ZM10.4 12.6V11.2H9V12.6H10.4ZM10.4 12.6V14H11.8V12.6H10.4Z" fill="#C4EB2A" />
                                    </svg>}
                                    <img
                                        src={`${import.meta.env.VITE_API_BACK}/hero/${item?.photo}`}
                                        alt={item?.name}
                                        className={styles.card_img}
                                    />
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className={styles.skills}>
                <h3 className={styles.skills_heading}>Team power:</h3>
                <div className={clsx(styles.skill, styles.skill__knowledge)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SwordIcon />
                            Knowledge
                        </div>
                        <span className={styles.skill_value}>
                            {team_skills.knowledge}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        height={2}
                        width={(team_skills.knowledge / max_team_skills.knowledge) * 100}
                    />
                </div>
                <div className={clsx(styles.skill, styles.skill__loyalty)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <FlashIcon />
                            Loyalty
                        </div>
                        <span className={styles.skill_value}>
                            {team_skills.loyalty}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        height={2}
                        width={(team_skills.loyalty / max_team_skills.loyalty) * 100}
                    />
                </div>
                <div className={clsx(styles.skill, styles.skill__influence)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SkullIcon />
                            Influence
                        </div>
                        <span className={styles.skill_value}>
                            {team_skills.influence}
                        </span>
                    </div>
                    <Line
                        className={styles.line}
                        height={2}
                        width={(team_skills.influence / max_team_skills.influence) * 100}
                    />
                </div>
            </div>

            <div className={styles.buttons}>
                <Island tag="button" onClick={handleMyCardsClick} className={styles.button}>
                    My cards
                </Island>

                <Island tag="button"
                    disabled={!hasChanges()}
                    onClick={handleSaveTeam}
                    className={styles.button}
                >
                    Save
                </Island>
            </div>

            {upgradedCard && (
                <Upgraded
                    onModalHide={() => setUpgradedCard(null)}
                    info={upgradedCard}
                />
            )}

            {isCardsGalleryActive && (
                <CardsPage
                    isActive={isCardsGalleryActive}
                    setIsActive={setIsCardsGalleryActive}
                    activeChoosedCard={activeChoosedCard}
                    setModalCard={setModalCard}
                    setActiveChoosedCard={setActiveChoosedCard}
                    setChoosedCards={setChoosedCards}
                    tempCards={activeChoosedCard ? choosedCards : undefined}
                    setTeamSkills={setTeamSkills}
                />
            )}

            {modalCard && modalCard.id !== 0 && (
                <Modal
                    onModalHide={() => {
                        setActiveChoosedCard(null)
                        setModalCard(null);
                    }}
                    heading={modalCard.name}
                    subheading={`level ${modalCard.level}`}
                >
                    <div className={styles.modal_content}>
                        <div
                            className={clsx(
                                styles.skill,
                                styles.skill__knowledge
                            )}
                        >
                            <div className={styles.skill_top}>
                                <div className={styles.skill_top_left}>
                                    <SwordIcon />
                                    Knowledge
                                </div>
                                <span className={styles.skill_value}>
                                    {modalCard.knowledge}
                                    {modalCard.count > 1 && modalCard.knowledge_step > 0 && <span>
                                        (+{modalCard.knowledge_step})
                                    </span>}
                                </span>
                            </div>
                            <Line
                                className={styles.line}
                                height={2}
                                width={((modalCard.count > 1 && modalCard.knowledge_step > 0 ? (modalCard.knowledge +
                                    modalCard.knowledge_step) : modalCard.knowledge) /
                                    MAX_CARD_KNOWLEDGE) *
                                    100}
                            />
                        </div>
                        <div
                            className={clsx(
                                styles.skill,
                                styles.skill__loyalty
                            )}
                        >
                            <div className={styles.skill_top}>
                                <div className={styles.skill_top_left}>
                                    <FlashIcon />
                                    Loyalty
                                </div>
                                <span className={styles.skill_value}>
                                    {modalCard.loyalty}
                                    {modalCard.count > 1 && modalCard.loyalty_step > 0 && <span>
                                        (+{modalCard.loyalty_step})
                                    </span>}
                                </span>
                            </div>
                            <Line
                                className={styles.line}
                                height={2}
                                width={((modalCard.count > 1 && modalCard.loyalty_step > 0 ? (modalCard.loyalty +
                                    modalCard.loyalty_step) : modalCard.loyalty) /
                                    MAX_CARD_LOYALTY) *
                                    100}
                            />
                        </div>
                        <div
                            className={clsx(
                                styles.skill,
                                styles.skill__influence
                            )}
                        >
                            <div className={styles.skill_top}>
                                <div className={styles.skill_top_left}>
                                    <SkullIcon />
                                    Influence
                                </div>
                                <span className={styles.skill_value}>
                                    {modalCard.influence}
                                    {modalCard.count > 1 && modalCard.influence_step > 0 && <span>
                                        (+{modalCard.influence_step})
                                    </span>}
                                </span>
                            </div>
                            <Line
                                className={styles.line}
                                height={2}
                                width={((modalCard.count > 1 && modalCard.influence_step > 0 ? (modalCard.influence +
                                    modalCard.influence_step) : modalCard.influence) /
                                    MAX_CARD_INFLUENCE) *
                                    100}
                            />
                        </div>

                        {modalCard.count < 2 && activeChoosedCard === null && <p className={styles.no_cards_text}>Upgrading requires the same card and points</p>}
                        {modalCard.count > 1 && !(modalCard.rarity === 'Legend' && modalCard.level === 7) && <Island
                            tag='button'
                            className={styles.upgradeButton}
                            disabled={balance < modalCard.upgrade_price || isUpgrading}
                            onClick={() =>
                                handleUpgradeCard(modalCard.id)
                            }
                        >
                            <span>
                                Upgrade { }
                                {formatNumber(
                                    modalCard.upgrade_price,
                                    "ru-RU"
                                )}
                            </span>
                            <CoinIcon className={styles.upgradeButton_icon} />
                        </Island>}
                        {activeChoosedCard !== null && <button
                            className={styles.changeButton}
                            onClick={handleChange}
                        >
                            Change
                        </button>}
                    </div>
                </Modal>
            )}
        </div>
    );
};
