import useHeroStore, { Card } from "entities/heroes";
import styles from "./styles.module.scss";
import ChestIcon from "icons/chest.svg?react";
import SwordIcon from "icons/sword.svg?react";
import FlashIcon from "icons/flash.svg?react";
import SkullIcon from "icons/skull.svg?react";
import CoinIcon from "icons/coin.svg?react";
import clsx from "clsx";
import ArrowDownIcon from "icons/arrow-down.svg?react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "shared/ui";
import { formatNumber, tgApp } from "shared/libs";
import useUserStore from "entities/user";
import useChestsStore from "entities/chests";
import { CardsPage } from "pages/cards";

export const TeamPage = () => {
    const cards = useHeroStore((state) => state.cards);
    const team_skills = useHeroStore((state) => state.team_skills);
    const saveTeam = useHeroStore((state) => state.saveTeam);
    const upgradeCard = useHeroStore((state) => state.upgradeCard);
    const [modalCard, setModalCard] = useState<Card | null>(null);
    const [activeChoosedCard, setActiveChoosedCard] = useState<Card | null>(
        null
    );
    const [choosedCards, setChoosedCards] = useState(
        cards.filter((item) => item.changed)
    );
    const [isCardUpdating, setIsCardUpdating] = useState(true);
    const balance = useUserStore.getState().balance;

    const renderAccordeon = (
        rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"
    ) => {
        const [isActive, setIsActive] = useState(false);
        const hasCards = cards.some((item) => item.rarity === rarity);

        const handleAccordionClick = () => {
            setIsActive((state) => !state);
        };

        return (
            <div
                className={clsx(
                    styles.accordeon,
                    !hasCards && styles.accordeon__disabled,
                    isActive && styles.accordeon__active
                )}
            >
                <div
                    className={styles.accordeon_button}
                    onClick={() => handleAccordionClick()}
                >
                    {rarity}
                    <ArrowDownIcon className={styles.accordeon_button_icon} />
                </div>
                <div className={styles.accordeon_list}>
                    <div className={styles.accordeon_list_wrapper}>
                        {cards
                            .filter((item) => item.rarity === rarity)
                            .map((card) => (
                                <div
                                    className={styles.accordeon_item}
                                    key={card.id}
                                >
                                    <div className={styles.accordeon_item_img}>
                                        <img
                                            src="/assets/card-item.png"
                                            alt={card.name}
                                        />
                                    </div>
                                    <div className={styles.accordeon_item_info}>
                                        <div
                                            className={clsx(
                                                styles.accordeon_item_title,
                                                activeChoosedCard &&
                                                    choosedCards.find(
                                                        (item) =>
                                                            item.id === card.id
                                                    ) &&
                                                    styles.accordeon_item_title__used
                                            )}
                                        >
                                            {card.name}
                                        </div>
                                        <div
                                            className={
                                                styles.accordeon_item_level
                                            }
                                        >
                                            {`${card.level} lvl`}
                                        </div>
                                    </div>
                                    {!activeChoosedCard && (
                                        <div
                                            className={
                                                styles.accordeon_item_button
                                            }
                                            onClick={() =>
                                                handleModalCard(card)
                                            }
                                        >
                                            Details
                                        </div>
                                    )}
                                    {activeChoosedCard &&
                                        !choosedCards.find(
                                            (item) => item.id === card.id
                                        ) && (
                                            <div
                                                className={clsx(
                                                    styles.accordeon_item_button,
                                                    styles.accordeon_item_button__select
                                                )}
                                                onClick={() =>
                                                    handleSelectClick(card)
                                                }
                                            >
                                                Select
                                            </div>
                                        )}
                                    {activeChoosedCard &&
                                        choosedCards.find(
                                            (item) => item.id === card.id
                                        ) && (
                                            <div
                                                className={clsx(
                                                    styles.accordeon_item_button,
                                                    styles.accordeon_item_button__used
                                                )}
                                            >
                                                Used
                                            </div>
                                        )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    };

    const handleModalCard = (card: Card) => {
        setModalCard(card);
        setIsCardUpdating(true);
    };

    const handleCardClick = (card: Card) => {
        if (activeChoosedCard?.id === card.id) {
            return setActiveChoosedCard(null);
        }
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

        console.log(hasChange);
        return hasChange;
    };

    const handleSelectClick = (card: Card) => {
        setChoosedCards((prevCards) => {
            return prevCards.map((item) => {
                if (item.id === activeChoosedCard?.id) {
                    return { ...card, changed: true };
                }

                return { ...item, changed: false };
            });
        });
        setActiveChoosedCard(null);
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

            saveTeam(choosedCards);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        const { chests, fetchChests } = useChestsStore.getState();
        if (chests.length === 0) {
            fetchChests();
        }

        tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (
                target.closest(`.${styles.card}`) ||
                target.closest(`.${styles.button}`) ||
                target.closest(`.${styles.accordeon_button}`) ||
                target.closest(`.${styles.cards_content}`)
            ) {
                return;
            }
            setActiveChoosedCard(null);
        };

        if (activeChoosedCard !== null) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeChoosedCard]);

    const handleUpgradeCard = async (hero_id: number) => {
        const isUpdgraded = await upgradeCard(hero_id);

        if (isUpdgraded) {
            setActiveChoosedCard(null);
        }
    };

    return (
        <div className={styles.container}>
            <CardsPage />
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h2 className={styles.heading}>My team</h2>
                    <p className={styles.description}>
                        {activeChoosedCard !== null
                            ? "Select a card any card from My cards"
                            : "Select the card you want to replace"}
                    </p>
                </div>
                <Link
                    to="/chests"
                    className={clsx(
                        styles.chest_icon,
                        activeChoosedCard !== null &&
                            !hasChanges() &&
                            styles.chest_icon__disabled
                    )}
                >
                    <ChestIcon />
                </Link>
            </div>

            <div className={styles.choosed_cards}>
                {choosedCards.slice(0, 5).map((hero) => (
                    <div
                        className={clsx(
                            styles.card,
                            activeChoosedCard?.id === hero.id &&
                                styles.card__active
                        )}
                        key={hero.id}
                        onClick={() => handleCardClick(hero)}
                    >
                        <img
                            src="/assets/card-item.png"
                            alt={hero.name}
                            className={styles.card_img}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.skills}>
                <h3 className={styles.skills_heading}>
                    {activeChoosedCard !== null
                        ? `${activeChoosedCard.name} values:`
                        : "Team values:"}
                </h3>
                <div className={clsx(styles.skill, styles.skill__knowledge)}>
                    <div className={styles.skill_top}>
                        <div className={styles.skill_top_left}>
                            <SwordIcon />
                            Knowledge
                        </div>
                        <span className={styles.skill_value}>
                            {activeChoosedCard === null
                                ? team_skills.knowledge
                                : activeChoosedCard.knowledge}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${
                                    (team_skills.knowledge / 231) * 100
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
                            {activeChoosedCard === null
                                ? team_skills.loyalty
                                : activeChoosedCard.loyalty}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${(team_skills.loyalty / 228) * 100}%`,
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
                            {activeChoosedCard === null
                                ? team_skills.influence
                                : activeChoosedCard.influence}
                        </span>
                    </div>
                    <div className={styles.line}>
                        <div
                            className={clsx(styles.line_inner)}
                            style={{
                                width: `${
                                    (team_skills.knowledge / 220) * 100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <button
                className={styles.button}
                disabled={!hasChanges()}
                onClick={handleSaveTeam}
            >
                Save
            </button>

            <div className={styles.cards}>
                <h2 className={styles.heading}>My team</h2>
                <div className={styles.cards_content}>
                    {renderAccordeon("Legendary")}
                    {renderAccordeon("Epic")}
                    {renderAccordeon("Rare")}
                    {renderAccordeon("Uncommon")}
                    {renderAccordeon("Common")}

                    {isCardUpdating && modalCard && (
                        <Modal
                            isActive={isCardUpdating}
                            setIsActive={setIsCardUpdating}
                            heading="Epic card # 1"
                            subheading="Choose your option"
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
                                            <span>
                                                {modalCard.knowledge_step &&
                                                    `(+${modalCard.knowledge_step})`}
                                            </span>
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.progress,
                                            styles.skill_progress
                                        )}
                                    >
                                        {new Array(20)
                                            .fill(0)
                                            .map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={clsx(
                                                        styles.progress_item,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    modalCard.knowledge /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__active,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    (modalCard.knowledge +
                                                                        modalCard.knowledge_step) /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__step
                                                    )}
                                                ></div>
                                            ))}
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
                                            <SwordIcon />
                                            Loyalty
                                        </div>
                                        <span className={styles.skill_value}>
                                            {modalCard.loyalty}
                                            <span>
                                                {modalCard.loyalty_step &&
                                                    `(+${modalCard.loyalty_step})`}
                                            </span>
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.progress,
                                            styles.skill_progress
                                        )}
                                    >
                                        {new Array(20)
                                            .fill(0)
                                            .map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={clsx(
                                                        styles.progress_item,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    modalCard.loyalty /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__active,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    (modalCard.loyalty +
                                                                        modalCard.loyalty_step) /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__step
                                                    )}
                                                ></div>
                                            ))}
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
                                            <SwordIcon />
                                            Influence
                                        </div>
                                        <span className={styles.skill_value}>
                                            {modalCard.influence}
                                            <span>
                                                {modalCard.influence_step &&
                                                    `(+${modalCard.influence_step})`}
                                            </span>
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.progress,
                                            styles.skill_progress
                                        )}
                                    >
                                        {new Array(20)
                                            .fill(0)
                                            .map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={clsx(
                                                        styles.progress_item,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    modalCard.influence /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__active,
                                                        index + 1 <=
                                                            Math.max(
                                                                Math.round(
                                                                    (modalCard.influence +
                                                                        modalCard.influence_step) /
                                                                        2.75
                                                                ),
                                                                1
                                                            ) &&
                                                            styles.progress_item__step
                                                    )}
                                                ></div>
                                            ))}
                                    </div>
                                </div>

                                <button
                                    className={styles.upgradeButton}
                                    disabled={balance < modalCard.upgrade_price}
                                    onClick={() =>
                                        handleUpgradeCard(modalCard.id)
                                    }
                                >
                                    <CoinIcon />
                                    {formatNumber(
                                        modalCard.upgrade_price,
                                        "ru-RU"
                                    )}
                                    <ArrowDownIcon
                                        className={styles.upgradeButton_icon}
                                    />
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};
