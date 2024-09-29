import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "widgets/loading";
import { AutoRotate } from "widgets/auto-rotate";
import { useInitializeApp } from "./hooks/useInitializeApp";
import { AppRoutes } from "./providers/RouterProvider";
import { useEnergy } from "features/energy";
import { useLoadFonts } from "./hooks/useLoadFonts";
import { LevelUpModal } from "widgets/level-up-modal";

function App() {
    useEnergy();
    const isInitialized = useInitializeApp();
    const isFontsLoaded = useLoadFonts();
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => setIsLoading(false), 5000);

    if (
        !isInitialized
        || !isFontsLoaded
        || isLoading
    )
        return <Loading />;


    return (
        <>
            <AutoRotate />
            <LevelUpModal />
            <Router>
                <AppRoutes />
            </Router>
        </>
    );
}

export default App;
