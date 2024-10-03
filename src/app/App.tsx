import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "widgets/loading";
import { AutoRotate } from "widgets/auto-rotate";
import { useInitializeApp } from "./hooks/useInitializeApp";
import { AppRoutes } from "./providers/RouterProvider";
import { useEnergy } from "features/energy";
import { useLoadFonts } from "./hooks/useLoadFonts";
import { LevelUpModal } from "widgets/level-up-modal";
import { useImagesPreload } from "./hooks/useImagesPreload";

function App() {
    useEnergy();
    const isInitialized = useInitializeApp();
    const isFontsLoaded = useLoadFonts();
    const isImagesLoading = useImagesPreload(isInitialized && isFontsLoaded);

    const [isTimeGoing, setIsTimeGoing] = useState(true);
    setTimeout(() => setIsTimeGoing(false), 5000);

    if (
        !isInitialized
        || !isFontsLoaded
        || isTimeGoing
        || isImagesLoading
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
