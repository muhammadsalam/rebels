import useHeroStore, { Card } from "entities/heroes";
import styles from "./styles.module.scss";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "shared/ui";
import { formatNumber, tgApp } from "shared/libs";
import useUserStore from "entities/user";
import { CardsPage } from "pages/cards";
import fetchHeroes from "features/fetchHeroes";
import { Loading } from "widgets/loading";
import {
    MAX_CARD_INFLUENCE,
    MAX_CARD_KNOWLEDGE,
    MAX_CARD_LOYALTY,
    MAX_TEAM_INFLUENCE,
    MAX_TEAM_KNOWLEDGE,
    MAX_TEAM_LOYALTY,
} from "shared/CONSTANT";
import upgradeCard from "features/card/upgrade";
import saveTeam from "features/team/save";
import { Upgraded } from "widgets/upgraded";

export const TeamPage = () => {
    const cards = useHeroStore((state) => state.cards);
    const team = useHeroStore((state) => state.team);
    const [team_skills, setTeamSkills] = useState(
        useHeroStore((state) => state.team_skills)
    );
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

    const handleCardClick = (card: Card) => {
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

        const filteredCards = cards.filter((item) => item.changed);

        for (let i = 0; i < choosedCards.length; i++) {
            if (!filteredCards.find((item) => item.id === choosedCards[i].id)) {
                hasChange = true;
                break;
            }
        }

        return hasChange;
    };

    const handleSaveTeam = () => {
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

            saveTeam(choosedCards).then(() => {
                // setChoosedCards(useHeroStore.getState().team);
            });
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        fetchHeroes().then(() => {
            setChoosedCards(useHeroStore.getState().team);
            setTeamSkills(useHeroStore.getState().team_skills);
        });

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    const handleUpgradeCard = async (hero_id: number) => {
        const upgradedCard = await upgradeCard(hero_id);

        if (upgradedCard) {
            setActiveChoosedCard(null);
            setModalCard(null);
            setChoosedCards(useHeroStore.getState().team);

            setUpgradedCard({ name: upgradedCard.name, level: upgradedCard.level });
            setTimeout(() => {
                setUpgradedCard(null);
            }, 2000);
        }
    };

    const handleChange = () => {
        setIsCardsGalleryActive(true);
        setModalCard(null);
    }

    if (!cards.length) return <Loading />;

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>My team</h2>
                </div>
            </div>

            <div className={styles.choosed_cards}>
                {choosedCards
                    .concat(
                        new Array(5).fill({
                            id: 0,
                            level: 0,
                            knowledge_step: 0,
                            loyalty_step: 0,
                            influence_step: 0,
                            changed: true,
                            influence: 0,
                            knowledge: 0,
                            loyalty: 0,
                            name: "",
                            rarity: "Common",
                            upgrade_price: 0,
                        })
                    )
                    .slice(0, 5)
                    .map((hero, index) => (
                        <div
                            className={clsx(
                                styles.card,
                                activeChoosedCard?.id === hero.id &&
                                styles.card__active
                            )}
                            key={'main_cards_' + hero.id + index}
                            onClick={() => handleCardClick(hero)}
                        >
                            {hero.id === 0 ? (
                                "+"
                            ) : (
                                <img
                                    src={`/assets/card-item-${hero.rarity.toLowerCase()}.png`}
                                    alt={hero.name}
                                    className={styles.card_img}
                                />
                            )}
                        </div>
                    ))}
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
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${(team_skills.knowledge /
                                    MAX_TEAM_KNOWLEDGE) *
                                    100
                                    }%`,
                            }}
                        ></div>
                    </div>
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
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${(team_skills.loyalty / MAX_TEAM_LOYALTY) *
                                    100
                                    }%`,
                            }}
                        ></div>
                    </div>
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
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${(team_skills.influence /
                                    MAX_TEAM_INFLUENCE) *
                                    100
                                    }%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    onClick={() => setIsCardsGalleryActive(true)}
                >
                    My cards
                </button>
                <button
                    className={styles.button}
                    disabled={!hasChanges()}
                    onClick={handleSaveTeam}
                >
                    Save
                </button>
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
                                    {modalCard.count > 1 && <span>
                                        (+{modalCard.knowledge_step})
                                    </span>}
                                </span>
                            </div>
                            <div className={styles.line}>
                                <div
                                    className={clsx(styles.line_inner)}
                                    style={{
                                        width: `${((modalCard.count > 1 ? (modalCard.knowledge +
                                            modalCard.knowledge_step) : modalCard.knowledge) /
                                            MAX_CARD_KNOWLEDGE) *
                                            100
                                            }%`,
                                    }}
                                ></div>
                            </div>
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
                                    {modalCard.count > 1 && <span>
                                        (+{modalCard.loyalty_step})
                                    </span>}
                                </span>
                            </div>
                            <div className={styles.line}>
                                <div
                                    className={clsx(styles.line_inner)}
                                    style={{
                                        width: `${((modalCard.count > 1 ? (modalCard.loyalty +
                                            modalCard.loyalty_step) : modalCard.loyalty) /
                                            MAX_CARD_LOYALTY) *
                                            100
                                            }%`,
                                    }}
                                ></div>
                            </div>
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
                                    {modalCard.count > 1 && <span>
                                        (+{modalCard.influence_step})
                                    </span>}
                                </span>
                            </div>
                            <div className={styles.line}>
                                <div
                                    className={clsx(styles.line_inner)}
                                    style={{
                                        width: `${((modalCard.count > 1 ? (modalCard.influence +
                                            modalCard.influence_step) : modalCard.influence) /
                                            MAX_CARD_INFLUENCE) *
                                            100
                                            }%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {modalCard.count < 2 && activeChoosedCard === null && <p className={styles.no_cards_text}>Upgrading requires the same card and points</p>}
                        {modalCard.count > 1 && <button
                            className={styles.upgradeButton}
                            disabled={balance < modalCard.upgrade_price}
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
                        </button>}
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
