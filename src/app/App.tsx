import useUserStore from "entities/user";
import { HomePage } from "pages/home";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { tgApp } from "shared/libs";

function App() {
    const fetchToken = useUserStore((state) => state.fetchToken);

    useEffect(() => {
        tgApp.ready();
        tgApp.setHeaderColor("#333");
        tgApp.setBackgroundColor("#333");
        tgApp.expand();
        tgApp.disableVerticalSwipes();

        fetchToken();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
