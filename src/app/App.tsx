import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import fetchUser from "features/fetchUser";
import { ChestsPage } from "pages/chests";
import { ChestsInfoPage } from "pages/chests-info/ui";
import { HomePage } from "pages/home";
import { MinePage } from "pages/mine";
import { TeamPage } from "pages/team";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { tgApp } from "shared/libs";

function App() {
    const fetchToken = useUserStore((state) => state.fetchToken);
    const token = useUserStore((state) => state.token);
    const userId = useUserStore((state) => state.id);
    const addEnergy = useGameStatsStore((state) => state.addEnergy);

    useEffect(() => {
        tgApp.ready();
        tgApp.setHeaderColor("#181818");
        tgApp.setBackgroundColor("#181818");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

        (async () => {
            const tokenSuccess = await fetchToken();
            if (tokenSuccess) {
                await fetchUser();
            }
        })();
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

    if (token === null || userId === null) return <>загрузка...</>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mine" element={<MinePage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/chests" element={<ChestsPage />} />
                <Route path="/chests/info" element={<ChestsInfoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
