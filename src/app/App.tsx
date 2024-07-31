import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import fetchUser from "features/fetchUser";
import { ShopPage } from "pages/shop";
import { ShopInfoPage } from "pages/shop-info/ui";
import { HomePage } from "pages/home";
import { MinePage } from "pages/mine";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { tgApp } from "shared/libs";
import { Loading } from "widgets/loading";
import FontFaceObserver from "fontfaceobserver";
import { QuestsPage } from "pages/quests";
import useChestsStore from "entities/chests";
import { ProfilePage } from "pages/profile";
import { TeamPage } from "pages/team";

function App() {
    const fetchToken = useUserStore((state) => state.fetchToken);
    const token = useUserStore((state) => state.token);
    const userId = useUserStore((state) => state.id);
    const addEnergy = useGameStatsStore((state) => state.addEnergy);
    const fetchChest = useChestsStore((state) => state.fetchChests);
    const chests = useChestsStore((state) => state.chests);

    const [isFontsLoading, setIsFontsLoading] = useState({
        PixelOperator: true,
        PixelOperatorMono: true,
    });

    useEffect(() => {
        tgApp.ready();
        tgApp.setHeaderColor("#0A0A0A");
        tgApp.setBackgroundColor("#0A0A0A");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

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
    }, []);

    useEffect(() => {
        if (userId === null) return;

        const intervalAddEnergy = setInterval(() => {
            addEnergy(12);
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
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/mine" element={<MinePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/info" element={<ShopInfoPage />} />
                <Route path="/quests" element={<QuestsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
