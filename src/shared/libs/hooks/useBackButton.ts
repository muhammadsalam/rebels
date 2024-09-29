import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tgApp } from "../utils";

export const useBackButton = (url: string = '/') => {
    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.isVisible || tgApp.BackButton.show();
        const backButtonClick = () => {
            navigate(url);
        };

        tgApp.BackButton.onClick(backButtonClick);

        return () => {
            tgApp.BackButton.offClick(backButtonClick);
        };
    }, []);
}