import useGameStatsStore from "entities/gameStats";
import useUserStore from "entities/user";
import { HomePage } from "pages/home";
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
        tgApp.setHeaderColor("#262626");
        tgApp.setBackgroundColor("#262626");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

        fetchToken();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            addEnergy(22);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [addEnergy]);

    if (token === null || userId === null) return <>загрузка...</>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
