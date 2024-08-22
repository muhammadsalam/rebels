import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import fetchUser from "features/fetchUser";
import { ShopPage } from "pages/shop";
import { ShopInfoPage } from "pages/shop-info";
import { HomePage } from "pages/home";
import { Mine } from "widgets/mine";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { tgApp } from "shared/libs";
import { Loading } from "widgets/loading";
import FontFaceObserver from "fontfaceobserver";
import { QuestsPage } from "pages/quests";
import { ProfilePage } from "pages/profile";
import { TeamPage } from "pages/team";
import { FriendsPage } from "pages/friends";
import { FriendsInfoPage } from "pages/friends-info";
import { AboutPage } from "pages/about";
import { FAQPage } from "pages/faq";
import { AutoRotate } from "widgets/auto-rotate";

function App() {
    const fetchToken = useUserStore((state) => state.fetchToken);
    const token = useUserStore((state) => state.token);
    const userId = useUserStore((state) => state.id);
    const addEnergy = useGameStatsStore((state) => state.addEnergy);

    const [isFontsLoading, setIsFontsLoading] = useState({
        PixelOperator: true,
        PixelOperatorMono: true,
    });

    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        tgApp.ready();
        tgApp.enableClosingConfirmation();
        tgApp.setHeaderColor("#0A0A0A");
        tgApp.setBackgroundColor("#0A0A0A");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

        if (parseFloat(tgApp.version) > 6.9) {
            tgApp.CloudStorage.getItem('vibro', (_: any, value: any) => {
                useUserStore.setState((state) => ({
                    ...state,
                    settings: { ...state.settings, vibro: value }
                }))
            });
        } else {
            useUserStore.setState((state) => ({
                ...state,
                settings: { ...state.settings, vibro: localStorage.getItem('vibro') === 'true' }
            }))
        }

        (async () => {
            const tokenSuccess = await fetchToken();
            if (tokenSuccess) {
                await fetchUser();
            }
        })();

        let PixelOperator = new FontFaceObserver("Pixel Operator");
        PixelOperator.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, PixelOperator: false }));
        });
        let PixelOperatorMono = new FontFaceObserver("Pixel Operator Mono");
        PixelOperatorMono.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({
                ...prev,
                PixelOperatorMono: false,
            }));
        });

        const handleOrientationChange = () => {
            if (!window.matchMedia("(orientation: landscape)").matches || (window.orientation && (window.orientation === 90 || window.orientation === -90))) {
                setIsLandscape(true);
            }
        }

        handleOrientationChange();

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };

    }, []);

    useEffect(() => {
        if (userId === null) return;

        const intervalAddEnergy = setInterval(() => {
            addEnergy();
        }, 1000);

        return () => {
            clearInterval(intervalAddEnergy);
        };
    }, [userId]);

    if (
        token === null ||
        userId === null ||
        isFontsLoading.PixelOperator ||
        isFontsLoading.PixelOperatorMono
    )
        return <Loading />;

    return (
        <>
            {isLandscape && <AutoRotate />}
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/mine" element={<Mine />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/info" element={<ShopInfoPage />} />
                    <Route path="/quests" element={<QuestsPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                    <Route path="/friends/info" element={<FriendsInfoPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
