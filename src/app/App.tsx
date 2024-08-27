import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "widgets/loading";
import { AutoRotate } from "widgets/auto-rotate";
import { useInitializeApp } from "./hooks/useInitializeApp";
import { AppRoutes } from "./providers/RouterProvider";
import { useEnergy } from "features/energy";
import { useLoadFonts } from "./hooks/useLoadFonts";
import { useOrientation } from "./hooks/useOrientation";

function App() {
    const { isInitialized } = useInitializeApp();
    const isFontsLoaded = useLoadFonts();
    const isLandscape = useOrientation();

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => setIsLoading(false), 3000);

    useEnergy();

    if (
        !isInitialized
        || !isFontsLoaded
        || isLoading
    )
        return <Loading />;


    return (
        <>
            {isLandscape && <AutoRotate />}
            <Router>
                <AppRoutes />
            </Router>
        </>
    );
}

export default App;
